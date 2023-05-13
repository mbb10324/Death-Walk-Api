import { GraphQLFieldConfig, GraphQLInt, GraphQLList } from "graphql";
import { HardType } from "../types/hard-types";
import { db } from "..";

export const HardQueries: GraphQLFieldConfig<any, any> = {
    type: new GraphQLList(HardType),
    description: 'List of a users hard game history',
    args: {
        id: { type: GraphQLInt },
    },
    resolve: (_, args) => {
        return db('hard_games').where('id', args.id);
    },
}