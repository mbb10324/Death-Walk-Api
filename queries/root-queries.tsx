import { GraphQLObjectType } from "graphql";
import { UserQueries } from "./user-queries";
import { UsersQueries } from "./users-queries";
import { EasyQueries } from "./easy-queries";
import { MediumQueries } from "./medium-queries";
import { HardQueries } from "./hard-queries";

export const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: UserQueries,
        users: UsersQueries,
        easyGames: EasyQueries,
        mediumGames: MediumQueries,
        hardGames: HardQueries,
    }
});