"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootMutationType = void 0;
const graphql_1 = require("graphql");
const user_mutations_1 = require("./user-mutations");
const easy_mutations_1 = require("./easy-mutations");
const medium_mutation_1 = require("./medium-mutation");
const hard_mutations_1 = require("./hard-mutations");
exports.RootMutationType = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: user_mutations_1.UserMutation,
        addEasy: easy_mutations_1.EasyMutation,
        addMedium: medium_mutation_1.MediumMutation,
        addHard: hard_mutations_1.HardMutation
    }
});
