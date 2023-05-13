"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootQueryType = void 0;
const graphql_1 = require("graphql");
const user_queries_1 = require("./user-queries");
const users_queries_1 = require("./users-queries");
const easy_queries_1 = require("./easy-queries");
const medium_queries_1 = require("./medium-queries");
const hard_queries_1 = require("./hard-queries");
exports.RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: user_queries_1.UserQueries,
        users: users_queries_1.UsersQueries,
        easyGames: easy_queries_1.EasyQueries,
        mediumGames: medium_queries_1.MediumQueries,
        hardGames: hard_queries_1.HardQueries,
    }
});
