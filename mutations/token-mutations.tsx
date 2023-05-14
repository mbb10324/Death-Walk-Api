import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { TokenType } from "../types/token-types";
import { db } from "..";

export const TokenMutation: GraphQLFieldConfig<any, any> = {
    type: TokenType,
    description: "Delete a token",
    args: {
        value: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        return db('tokens').where('value', args.value).del()
    }
}