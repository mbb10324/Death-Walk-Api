import { MyGraphQLFieldConfig } from "../types/custom-fields";
import { userAuth } from "../helpers/auth-middleware";
import { EasyType } from "../types/easy-types";
import { GraphQLInt } from "graphql";
import { db } from "..";

export const EasyMutation: MyGraphQLFieldConfig<any, any> = {
    type: EasyType,
    description: "Add easy scores to a user",
    middleware: [userAuth],
    args: {
        user_id: { type: GraphQLInt },
        games: { type: GraphQLInt },
        wins: { type: GraphQLInt },
        loses: { type: GraphQLInt }
    },
    resolve: async (_, args) => {
        const { user_id, games, wins, loses } = args;
        const existingUser = await db('easy_game')
            .where({ user_id })
            .first();
        if (existingUser) {
            const updatedUser = {
            ...existingUser,
            games: existingUser.games + games,
            wins: existingUser.wins + wins,
            loses: existingUser.loses + loses,
        };
        await db('easy_game')
            .where({ user_id })
            .update(updatedUser);
            return updatedUser;
        } else {
            const [newUser] = await db('easy_game')
                .insert({ user_id, games, wins, loses })
                .returning('*');
            return newUser;
        }
    },
}