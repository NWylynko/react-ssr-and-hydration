import Fastify from "fastify";
import Static from "@fastify/static";

import path from "node:path";

import { SSRHandler } from "./react-ssr";

export const fastify = Fastify({ logger: true });

fastify.register(Static, {
  root: path.join(__dirname, '../../static'),
  prefix: '/static/'
})

fastify.all('*', SSRHandler)

const port = Number(process.env.PORT ?? "3000")

fastify.listen({ port, host: "0.0.0.0" }, err => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})