import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./reslovers.js";
import fs from "fs";
import path from "path";

const typeDefs = fs.readFileSync(path.join(process.cwd(),"src","typedefs.gql"),"utf8");

    

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀 Server ready at ${url}`);
