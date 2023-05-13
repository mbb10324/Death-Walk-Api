import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { UserType } from "../types/user-types";
import { db } from "..";

export const UserQueries: GraphQLFieldConfig<any, any> = {
    type: UserType,
    description: 'A Single User',
    args: {
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: (_, args) => {
      return db('users').where('username', args.username).where('password', args.password).first();
    },
  }