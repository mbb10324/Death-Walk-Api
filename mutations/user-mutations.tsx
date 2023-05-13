import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { db } from "..";
import { UserType } from "../types/user-types";

export const UserMutation: GraphQLFieldConfig<any, any> = {
    type: UserType,
    description: "Add a user",
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: (_, args) => {
        const { username, password, email } = args;
        return db('users')
            .where({ username, email })
            .first()
            .then((existingUser) => {
                if (existingUser) {
                    throw new Error('User already exists');
                } else {
                    return db('users')
                        .insert({ username, password, email })
                        .returning('*')
                        .then((rows) => rows[0]);
                }
            });
    }
}
