import Fastify from "fastify";
import Static from "@fastify/static";

import path from "node:path";

import { SSRHandler } from "./react-ssr";

// create our fastify instance, telling it to log requests
export const fastify = Fastify({ logger: true });

// use the Offical Static package to host the webpack bundle
fastify.register(Static, {
  root: path.join(__dirname, '../../static'),
  prefix: '/static/'
})

// all the other requests are handled by our react app
fastify.all('*', SSRHandler)

// default to port 3000
const port = Number(process.env.PORT ?? "3000")

// listen to requests
fastify.listen({ port, host: "0.0.0.0" })