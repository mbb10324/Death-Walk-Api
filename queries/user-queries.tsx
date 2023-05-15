import { JWT_SECRET, sanitizeUser, sign } from "../helpers/auth-middleware";
import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { comparePasswords } from "../helpers/password-hashing";
import { UserType } from "../types/user-types";
import { db } from "..";

/**********************************************************************************************/
export const LoginQueries: GraphQLFieldConfig<any, any> = {
    type: UserType,
    description: 'login query',
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const { username, password } = args;
        const user = await db('users').where({ username }).select('*').first();
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const passwordsMatch = await comparePasswords(password, user.password);
        if (!passwordsMatch) {
            throw new Error('Invalid credentials');
        }
        const sanitizedUser = sanitizeUser(user);
        const token = await sign(sanitizedUser, JWT_SECRET);
        await db('tokens').insert({value: token});
        return { id: user?.id, username: user?.username, email: user?.email, token }
    },
}

/**********************************************************************************************/
export const IdentityQueries: GraphQLFieldConfig<any, any> = {
    type: UserType,
    description: 'Identity Check',
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const email = await db('users')
            .select('email')
            .where('email', args.email)
            .first()
        const username = await db('users')
            .select('username')
            .where('username', args.username)
            .first()
        return { username: username?.username, email: email?.email }
    }
}

/**********************************************************************************************/
export const UserQueries: GraphQLFieldConfig<any, any> = {
    type: UserType,
    description: 'A single user',
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
    },
    resolve: async(_, args) => {
        const {username, email} = args
        return db('users').where({ username, email }).first()
    },
}