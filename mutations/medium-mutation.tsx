import { GraphQLFieldConfig, GraphQLInt } from "graphql";
import { db } from "..";
import { MediumType } from "../types/medium-types";

export const MediumMutation: GraphQLFieldConfig<any, any> = {
    type: MediumType,
    description: "Add medium scores to a user",
    args: {
        user_id: { type: GraphQLInt },
        games: { type: GraphQLInt },
        wins: { type: GraphQLInt },
        loses: { type: GraphQLInt }
    },
    resolve: async (_, args) => {
        const { user_id, games, wins, loses } = args;
        const existingUser = await db('medium_game')
            .where({ user_id })
            .first();
        if (existingUser) {
            const updatedUser = {
            ...existingUser,
            games: existingUser.games + games,
            wins: existingUser.wins + wins,
            loses: existingUser.loses + loses,
        };
        await db('medium_game')
            .where({ user_id })
            .update(updatedUser);
            return updatedUser;
        } else {
            const [newUser] = await db('medium_game')
                .insert({ user_id, games, wins, loses })
                .returning('*');
            return newUser;
        }
    }
}