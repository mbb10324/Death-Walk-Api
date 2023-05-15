import { MyGraphQLFieldConfig } from "../types/custom-fields";
import { userAuth } from "../helpers/auth-middleware";
import { TokenType } from "../types/token-types";
import { GraphQLString } from "graphql";
import { db } from "..";

export const TokenMutation: MyGraphQLFieldConfig<any, any> = {
    type: TokenType,
    description: "Delete a token",
    middleware: [userAuth],
    args: {
        value: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        return db('tokens').where('value', args.value).del()
    }
}