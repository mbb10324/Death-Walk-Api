"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardType = void 0;
const graphql_1 = require("graphql");
exports.HardType = new graphql_1.GraphQLObjectType({
    name: 'HardGames',
    description: 'This represents a users hard games',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt },
        user_id: { type: graphql_1.GraphQLInt },
        games: { type: graphql_1.GraphQLInt },
        wins: { type: graphql_1.GraphQLInt },
        loses: { type: graphql_1.GraphQLInt }
    })
});
