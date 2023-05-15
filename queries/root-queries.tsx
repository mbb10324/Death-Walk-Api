import { IdentityQueries, LoginQueries, UserQueries } from "./user-queries";
import { GraphQLObjectType } from "graphql";
import { UsersQueries } from "./users-queries";
import { EasyQueries } from "./easy-queries";
import { MediumQueries } from "./medium-queries";
import { HardQueries } from "./hard-queries";
import { TokenQueries } from "./token-queries";

export const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: UserQueries,
        users: UsersQueries,
        login: LoginQueries,
        easyGames: EasyQueries,
        mediumGames: MediumQueries,
        hardGames: HardQueries,
        identities: IdentityQueries,
        token: TokenQueries
    }
});