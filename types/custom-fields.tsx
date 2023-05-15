import { GraphQLFieldConfig } from "graphql";
import express from "express"

export type Middleware =
    (req: express.Request, res: express.Response, next: express.NextFunction) => any

//custom field type to allow middleware
export type MyGraphQLFieldConfig<
    TSource,
    TContext,
    TArgs = { [argName: string]: any }
> = GraphQLFieldConfig<TSource, TContext, TArgs> & {
    middleware?: Middleware[];
};

declare global {
    namespace Express {
        export interface Request {
            user?: any;
            token?: string;
        }
    }
}
