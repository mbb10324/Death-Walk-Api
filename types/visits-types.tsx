import { GraphQLInt, GraphQLObjectType } from "graphql";
import { GraphQLISODateTime } from "../helpers/date-type";

  export const SiteVisits = new GraphQLObjectType({
    name: 'SiteVisits',
    description: 'This represents the amount of times a user has visited the website',
    fields: () => ({
        id: { type: GraphQLInt },
        user_id: { type:  GraphQLInt },
        initial_date: { type:  GraphQLISODateTime },
        last_date: { type:  GraphQLISODateTime },
        total: { type: GraphQLInt }
    })
});