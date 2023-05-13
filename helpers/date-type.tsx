import { GraphQLScalarType, Kind } from "graphql";

export const GraphQLISODateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'ISO-8601 formatted datetime string',
    serialize(value) {
      return new Date(value).toISOString();
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  });