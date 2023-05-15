import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { Middleware } from '../types/custom-fields';
import { db } from '..';

export const JWT_SECRET: Secret | GetPublicKeyOrSecret = process.env.JWT_SECRET || 'shhhh'

const util = require('util')

export const sign = util.promisify(jwt.sign)
const verify = util.promisify(jwt.verify)

export const userAuth: Middleware = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    // Ensure a token is present.
    if (!token) {
        return res.status(401).json({ message: 'Not Authorized' });
    }
    // Ensure we know about the token.
    const savedToken = await db('tokens').select('*').where('value', token).first();
    if (!savedToken) {
        return res.status(401).json({ message: 'Not Authorized' });
    }
    // Ensure the token is valid and decode it.
    try {
        const { email } = await verify(token, JWT_SECRET);
        const user = await db('users').select('*').where({ email }).first();
        req.user = user;
        req.token = token;
        return next();
    } catch (e) {
        return res.status(401).json({ message: 'Not Authorized' });
    }
}

type User = {
    username: string;
    email: string;
    password: string;
}

export function sanitizeUser({ password, ...user }: User) {
    return user;
}