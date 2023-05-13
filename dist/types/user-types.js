"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const graphql_1 = require("graphql");
const __1 = require("..");
const easy_types_1 = require("./easy-types");
const medium_types_1 = require("./medium-types");
const hard_types_1 = require("./hard-types");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt },
        email: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        easyGames: {
            type: easy_types_1.EasyType,
            resolve: (user) => {
                return (0, __1.db)('easy_game').where('user_id', user.id).first();
            }
        },
        mediumGames: {
            type: medium_types_1.MediumType,
            resolve: (user) => {
                return (0, __1.db)('medium_game').where('user_id', user.id).first();
            }
        },
        hardGames: {
            type: hard_types_1.HardType,
            resolve: (user) => {
                return (0, __1.db)('hard_game').where('user_id', user.id).first();
            }
        },
    })
});
