import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

  export const TokenType = new GraphQLObjectType({
    name: 'Tokens',
    description: 'This represents tokens',
    fields: () => ({
        id: { type: GraphQLInt },
        value: { type: GraphQLString }
    })
});