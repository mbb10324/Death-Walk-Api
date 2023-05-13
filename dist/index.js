"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const root_queries_1 = require("./queries/root-queries");
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const dotenv_1 = __importDefault(require("dotenv"));
const knex_1 = __importDefault(require("knex"));
//initialize environment vars
dotenv_1.default.config();
const port = process.env.PORT;
//initialize express/cors
const app = (0, express_1.default)();
const cors = require("cors");
//establish express/cors middleware
app.use(express_1.default.json());
app.use(cors());
//express server endpoint
const endpoint = `http://localhost:${port}`;
//initialize knex database connection
exports.db = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'docker',
        database: 'death_walk'
    }
});
//define graphql db schema
const schema = new graphql_1.GraphQLSchema({
    query: root_queries_1.RootQueryType,
    // mutation: RootMutationType,
});
//creates graphql connection
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({ schema: schema, graphiql: true, }));
//server running endpoint indicator
app.get('/', (req, res) => {
    res.send(`<div style="text-align:center;color:red;background-color:#252525;
    padding-top:10%;height:100%;font-family:courier,monospace"><h1>⚡️ Server 
    is running ⚡️</h1><br><br> <h2>This server establishes the Death Walk API,
    and <br>utilizes graphql at <a href='${endpoint}/graphql' style="color:
    orange">${endpoint}/graphql</a></h2><br><br>Built with express+typescript
    <br>Copyright (c) 2023 Death Walk</div>`);
});
//server running terminal indicator
app.listen(port, () => {
    console.log(`⚡️ Server is running at ${endpoint} ⚡️`);
});
