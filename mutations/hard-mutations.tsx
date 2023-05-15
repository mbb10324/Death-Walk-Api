import { MyGraphQLFieldConfig } from "../types/custom-fields";
import { userAuth } from "../helpers/auth-middleware";
import { HardType } from "../types/hard-types";
import { GraphQLInt } from "graphql";
import { db } from "..";

export const HardMutation: MyGraphQLFieldConfig<any, any> = {
    type: HardType,
    description: "Add hard scores to a user",
    middleware: [userAuth],
    args: {
        user_id: { type: GraphQLInt },
        games: { type: GraphQLInt },
        wins: { type: GraphQLInt },
        loses: { type: GraphQLInt }
    },
    resolve: async (_, args) => {
        const { user_id, games, wins, loses } = args;
        const existingUser = await db('hard_game')
            .where({ user_id })
            .first();
        if (existingUser) {
            const updatedUser = {
            ...existingUser,
            games: existingUser.games + games,
            wins: existingUser.wins + wins,
            loses: existingUser.loses + loses,
        };
        await db('hard_game')
            .where({ user_id })
            .update(updatedUser);
            return updatedUser;
        } else {
            const [newUser] = await db('hard_game')
                .insert({ user_id, games, wins, loses })
                .returning('*');
            return newUser;
        }
    }
}