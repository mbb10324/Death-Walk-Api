"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootQueryType = void 0;
const graphql_1 = require("graphql");
const __1 = require("..");
const easy_types_1 = require("../types/easy-types");
const hard_types_1 = require("../types/hard-types");
const medium_types_1 = require("../types/medium-types");
const user_types_1 = require("../types/user-types");
exports.RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: {
        user: {
            type: user_types_1.UserType,
            description: 'A Single User',
            args: {
                username: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve: (_, args) => {
                return (0, __1.db)('users').where('username', args.username).where('password', args.password).first();
            },
        },
        users: {
            type: new graphql_1.GraphQLList(user_types_1.UserType),
            description: 'List of all Users',
            resolve: () => {
                return (0, __1.db)('users');
            },
        },
        userEasyGames: {
            type: new graphql_1.GraphQLList(easy_types_1.EasyType),
            description: 'List of a users easy game history',
            args: {
                id: { type: graphql_1.GraphQLInt },
            },
            resolve: (_, args) => {
                return (0, __1.db)('easy_games').where('id', args.id);
            },
        },
        userMediumGames: {
            type: new graphql_1.GraphQLList(medium_types_1.MediumType),
            description: 'List of a users medium game history',
            args: {
                id: { type: graphql_1.GraphQLInt },
            },
            resolve: (_, args) => {
                return (0, __1.db)('medium_games').where('id', args.id);
            },
        },
        userHardGames: {
            type: new graphql_1.GraphQLList(hard_types_1.HardType),
            description: 'List of a users hard game history',
            args: {
                id: { type: graphql_1.GraphQLInt },
            },
            resolve: (_, args) => {
                return (0, __1.db)('hard_games').where('id', args.id);
            },
        },
    },
});
