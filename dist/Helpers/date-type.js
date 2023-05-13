"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLISODateTime = void 0;
const graphql_1 = require("graphql");
exports.GraphQLISODateTime = new graphql_1.GraphQLScalarType({
    name: 'DateTime',
    description: 'ISO-8601 formatted datetime string',
    serialize(value) {
        return new Date(value).toISOString();
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});
