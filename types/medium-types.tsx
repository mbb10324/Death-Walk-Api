import { GraphQLInt, GraphQLObjectType } from "graphql";

export const MediumType = new GraphQLObjectType({
    name: 'MediumGames',
    description: 'This represents a users medium games',
    fields: () => ({
        id: { type: GraphQLInt },
        user_id: { type:  GraphQLInt },
        games: { type:  GraphQLInt },
        wins: { type:  GraphQLInt },
        loses: { type: GraphQLInt }
    })
});