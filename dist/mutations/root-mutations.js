"use strict";
// //mutates data
// const RootMutationType = new GraphQLObjectType({
//     name: "Mutation",
//     description: "Root Mutation",
//     fields: () => ({
//         addBook: {
//             type: BookType,
//             description: "Add a book",
//             args: {
//                 name: { type: GraphQLNonNull(GraphQLString) },
//                 authorId: { type: GraphQLNonNull(GraphQLInt) },
//             },
//             resolve: (_, args) => {
//                 return db('books')
//                     .insert({
//                         name: args.name,
//                         author_id: args.authorId,
//                     })
//                     .returning('*')
//                     .then((rows) => rows[0]);
//             },
//         },
//         addAuthor: {
//             type: AuthorType,
//             description: "Add an author",
//             args: {
//                 name: { type: GraphQLNonNull(GraphQLString) },
//             },
//             resolve: (_, args) => {
//                 return db('authors')
//                 .insert({
//                     name: args.name,
//                 })
//                 .returning('*')
//                 .then((rows) => rows[0]);
//             },
//         },
//     }),
// });
