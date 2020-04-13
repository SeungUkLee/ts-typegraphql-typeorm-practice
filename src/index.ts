import "reflect-metadata"
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/BookResolver";

// This function makes it easier to initialize every single library that we use in this project.
async function main() {
    const conn = await createConnection(); // create a new connection to our db.
    const schema = await buildSchema({
        resolvers: [BookResolver],
    }); // generate our GraphQL schema
    const server = new ApolloServer({ schema }); // initialize our apollo server
    await server.listen(4000);
    console.log("Server has started!");
}

main().catch((err) => console.log(`ERR: ${err}`));
