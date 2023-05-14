import { JWT_SECRET, sanitizeUser, sign } from "../helpers/auth-middleware";
import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { comparePasswords } from "../helpers/password-hashing";
import { UserType } from "../types/user-types";
import { db } from "..";

export const UserQueries: GraphQLFieldConfig<any, any> = {
    type: UserType,
    description: 'A Single User',
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
        const token = sign(sanitizedUser, JWT_SECRET);
        await db('tokens').insert({value: token});
        return { user: sanitizedUser, token }
    },
}