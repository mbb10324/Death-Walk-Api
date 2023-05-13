"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteVisits = void 0;
const graphql_1 = require("graphql");
const date_type_1 = require("../helpers/date-type");
exports.SiteVisits = new graphql_1.GraphQLObjectType({
    name: 'SiteVisits',
    description: 'This represents the amount of times a user has visited the website',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt },
        user_id: { type: graphql_1.GraphQLInt },
        initial_date: { type: date_type_1.GraphQLISODateTime },
        last_date: { type: date_type_1.GraphQLISODateTime },
        total: { type: graphql_1.GraphQLInt }
    })
});
