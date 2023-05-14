import { GraphQLFieldConfig } from "graphql";

//custom field type to allow middleware
export type MyGraphQLFieldConfig<TSource, TContext, TArgs = { [argName: string]: any }> = 
    GraphQLFieldConfig<TSource, TContext, TArgs> & 
    { middleware?: Array<(req: any, res: any, next: any) => 
        Promise<any>> };