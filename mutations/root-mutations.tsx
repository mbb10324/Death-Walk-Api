import { GraphQLObjectType } from "graphql";
import { UserMutation } from "./user-mutations";
import { EasyMutation } from "./easy-mutations";
import { MediumMutation } from "./medium-mutation";
import { HardMutation } from "./hard-mutations";
import { TokenMutation } from "./token-mutations";

export const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      addUser: UserMutation,
      addEasy: EasyMutation,
      addMedium: MediumMutation,
      addHard: HardMutation,
      deleteToken: TokenMutation
    }
  });