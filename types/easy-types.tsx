import { GraphQLInt, GraphQLObjectType } from "graphql";

export const EasyType = new GraphQLObjectType({
    name: 'EasyGames',
    description: 'This represents a users easy games',
    fields: () => ({
        id: { type: GraphQLInt },
        user_id: { type:  GraphQLInt },
        games: { type:  GraphQLInt },
        wins: { type:  GraphQLInt },
        loses: { type: GraphQLInt }
    })
});