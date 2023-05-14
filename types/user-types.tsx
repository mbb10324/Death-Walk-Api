import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { EasyType } from "./easy-types";
import { MediumType } from "./medium-types";
import { HardType } from "./hard-types"
import { db } from "..";

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        id: { type: GraphQLInt },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        easyGames: {
            type: EasyType, 
            resolve: (user) => {
                return db('easy_game').where('user_id', user.id).first()
            }
        },
        mediumGames: {
            type: MediumType, 
            resolve: (user) => {
                return db('medium_game').where('user_id', user.id).first()
            }
        },
        hardGames: {
            type: HardType, 
            resolve: (user) => {
                return db('hard_game').where('user_id', user.id).first()
            }
        },
        sanitizedUser: { type: GraphQLString },
        token: { type: GraphQLString }
    })
});
