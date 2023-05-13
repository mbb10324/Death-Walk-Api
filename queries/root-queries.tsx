import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { db } from "..";
import { EasyType } from "../types/easy-types";
import { HardType } from "../types/hard-types";
import { MediumType } from "../types/medium-types";
import { UserType } from "../types/user-types";

export const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: {
      user: {
        type: UserType,
        description: 'A Single User',
        args: {
          username: { type: GraphQLString },
          password: { type: GraphQLString },
        },
        resolve: (_, args) => {
          return db('users').where('username', args.username).where('password', args.password).first();
        },
      },
      users: {
        type: new GraphQLList(UserType),
        description: 'List of all Users',
        resolve: () => {
          return db('users');
        },
      },
      userEasyGames: {
        type: new GraphQLList(EasyType),
        description: 'List of a users easy game history',
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (_, args) => {
          return db('easy_games').where('id', args.id);
        },
      },
      userMediumGames: {
        type: new GraphQLList(MediumType),
        description: 'List of a users medium game history',
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (_, args) => {
          return db('medium_games').where('id', args.id);
        },
      },
      userHardGames: {
        type: new GraphQLList(HardType),
        description: 'List of a users hard game history',
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (_, args) => {
          return db('hard_games').where('id', args.id);
        },
      },
    },
  });