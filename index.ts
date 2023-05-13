import express, { Express, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql';
import knex from 'knex';

dotenv.config(); // node will do this for me
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
const cors = require("cors");
app.use(cors())

const endpoint = `http://localhost:${port}`

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'docker',
        database: 'library'
    }
});

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        id: { type: GraphQLInt },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

const EasyType = new GraphQLObjectType({
    name: 'Easy Games',
    description: 'This represents a users easy games',
    fields: () => ({
        id: { type: GraphQLInt },
        user_id: { type:  GraphQLInt },
        games: { type:  GraphQLInt },
        wins: { type:  GraphQLInt },
        loses: { type: GraphQLInt }
    })
});

//queries data
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'A Single Book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (_, args) => {
                return db('books').where({ id: args.id }).first();
            },
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => {
                return db('books');
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: () => {
                return db('authors');
            }
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (_, args) => {
                return db('authors').where({ id: args.id }).first();
            }
        }
    })
});

//mutates data
const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Add a book",
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) },
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
                name: { type: GraphQLNonNull(GraphQLString) },
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

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);

app.get('/', (req: Request, res: Response) => {
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