"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_1 = require("graphql");
const knex_1 = __importDefault(require("knex"));
dotenv_1.default.config(); // node will do this for me
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
const cors = require("cors");
app.use(cors());
const endpoint = `http://localhost:${port}`;
const db = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'docker',
        database: 'library'
    }
});
const UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt },
        email: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    })
});
const EasyType = new graphql_1.GraphQLObjectType({
    name: 'Easy Games',
    description: 'This represents a users easy games',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt },
        user_id: { type: graphql_1.GraphQLInt },
        games: { type: graphql_1.GraphQLInt },
        wins: { type: graphql_1.GraphQLInt },
        loses: { type: graphql_1.GraphQLInt }
    })
});
//queries data
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'A Single Book',
            args: {
                id: { type: graphql_1.GraphQLInt }
            },
            resolve: (_, args) => {
                return db('books').where({ id: args.id }).first();
            },
        },
        books: {
            type: new graphql_1.GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => {
                return db('books');
            }
        },
        authors: {
            type: new graphql_1.GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: () => {
                return db('authors');
            }
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
                id: { type: graphql_1.GraphQLInt }
            },
            resolve: (_, args) => {
                return db('authors').where({ id: args.id }).first();
            }
        }
    })
});
//mutates data
const RootMutationType = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Add a book",
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                authorId: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
            },
            resolve: (_, args) => {
                return db('books')
                    .insert({
                    name: args.name,
                    author_id: args.authorId,
                })
                    .returning('*')
                    .then((rows) => rows[0]);
            },
        },
        addAuthor: {
            type: AuthorType,
            description: "Add an author",
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            resolve: (_, args) => {
                return db('authors')
                    .insert({
                    name: args.name,
                })
                    .returning('*')
                    .then((rows) => rows[0]);
            },
        },
    }),
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    graphiql: true,
}));
app.get('/', (req, res) => {
    res.send(`<div style="text-align:center;color:red;background-color:#252525;
    padding-top:10%;height:100%;font-family:courier,monospace"><h1>⚡️ Server 
    is running ⚡️</h1><br><br> <h2>This server establishes the Death Walk API,
    and <br>utilizes graphql at <a href='${endpoint}/graphql' style="color:
    orange">${endpoint}/graphql</a></h2><br><br>Built with express+typescript
    <br>Copyright (c) 2023 Death Walk</div>`);
});
app.listen(port, () => {
    console.log(`⚡️ Server is running at ${endpoint} ⚡️`);
});
