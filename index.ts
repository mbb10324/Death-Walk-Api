import express, { Express, Request, Response } from 'express';
import { RootMutationType } from './mutations/root-mutations';
import { RootQueryType } from './queries/root-queries';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import dotenv from 'dotenv';
import knex from 'knex';

//initialize environment vars
dotenv.config();
const port = process.env.PORT

//initialize express/cors
const app: Express = express();
const cors = require("cors");

//establish express/cors middleware
app.use(express.json());
app.use(cors())

//express server endpoint
const endpoint = `http://localhost:${port}`

//initialize knex database connection
export const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'docker',
        database: 'death_walk'
    }
});

//define graphql db schema
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

//creates graphql connection
app.use('/graphql', graphqlHTTP({schema: schema, graphiql: true, }));

//server running: endpoint indicator
app.get('/', (req: Request, res: Response) => {
    res.send(`<div style="text-align:center;color:red;background-color:#252525;
    padding-top:10%;height:100%;font-family:courier,monospace"><h1>⚡️ Server 
    is running ⚡️</h1><br><br> <h2>This server establishes the Death Walk API,
    and <br>utilizes graphql at <a href='${endpoint}/graphql' style="color:
    orange">${endpoint}/graphql</a></h2><br><br><p>Built with express+typescript</p>
    <p>Copyright (c) 2023 Death Walk</p></div>`);
});

//server running: terminal indicator
app.listen(port, () => {
    console.log(`⚡️ Server is running at ${endpoint} ⚡️`);
});