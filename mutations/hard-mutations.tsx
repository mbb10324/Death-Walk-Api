import { GraphQLFieldConfig, GraphQLInt } from "graphql";
import { db } from "..";
import { HardType } from "../types/hard-types";

export const HardMutation: GraphQLFieldConfig<any, any> = {
    type: HardType,
    description: "Add hard scores to a user",
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