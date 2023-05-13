import { GraphQLFieldConfig, GraphQLInt, GraphQLList } from "graphql";
import { EasyType } from "../types/easy-types";
import { db } from "..";

export const EasyQueries: GraphQLFieldConfig<any, any> = {
    type: new GraphQLList(EasyType),
    description: 'List of a users easy game history',
    args: {
        id: { type: GraphQLInt },
    },
    resolve: (_, args) => {
        return db('easy_games').where('id', args.id);
    },
}