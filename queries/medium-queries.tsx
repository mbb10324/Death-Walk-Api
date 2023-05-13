import { GraphQLFieldConfig, GraphQLInt, GraphQLList } from "graphql";
import { MediumType } from "../types/medium-types";
import { db } from "..";

export const MediumQueries: GraphQLFieldConfig<any, any> = {
    type: new GraphQLList(MediumType),
    description: 'List of a users medium game history',
    args: {
        id: { type: GraphQLInt },
    },
    resolve: (_, args) => {
        return db('medium_games').where('id', args.id);
    },
}