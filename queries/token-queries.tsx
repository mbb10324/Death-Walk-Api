import { GraphQLFieldConfig, GraphQLString } from "graphql"
import { db } from ".."
import { TokenType } from "../types/token-types"

export const TokenQueries: GraphQLFieldConfig<any, any> = {
    type: TokenType,
    description: 'A single token',
    args: {
        value: { type: GraphQLString },
    },
    resolve: async(_, args) => {
        const { value } = args
        return await db('tokens').where({ value }).first()
    },
}