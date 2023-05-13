import { GraphQLInt, GraphQLObjectType } from "graphql";

export const HardType = new GraphQLObjectType({
    name: 'HardGames',
    description: 'This represents a users hard games',
    fields: () => ({
        id: { type: GraphQLInt },
        user_id: { type:  GraphQLInt },
        games: { type:  GraphQLInt },
        wins: { type:  GraphQLInt },
        loses: { type: GraphQLInt }
    })
});