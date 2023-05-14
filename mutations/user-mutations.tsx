import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { hashPassword } from "../helpers/password-hashing";
import { UserType } from "../types/user-types";
import { db } from "..";

export const UserMutation: GraphQLFieldConfig<any, any> = {
    type: UserType,
    description: "Add a user",
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { username, password, email } = args;
        const existingUser = await db('users').where({ username, email }).first();
        if (existingUser) {
            throw new Error('User already exists');
        } else {
            const hashedPassword = await hashPassword(password)
            const [newUser] = await db('users')
                .insert({ username, password: hashedPassword, email })
                .returning('*');
            return newUser;
        }
    }
}
