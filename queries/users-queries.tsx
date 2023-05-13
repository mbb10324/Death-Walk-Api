import { GraphQLFieldConfig, GraphQLList } from "graphql";
import { UserType } from "../types/user-types";
import { db } from "..";

export const UsersQueries: GraphQLFieldConfig<any, any> = {
    type: new GraphQLList(UserType),
    description: 'List of all Users',
    resolve: () => {
        return db('users');
    },
}
