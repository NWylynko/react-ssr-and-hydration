FROM node:18.8.0-alpine as deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

FROM node:18.8.0-alpine as build

WORKDIR /app

COPY package.json ./
COPY --from=deps /app/node_modules ./node_modules

COPY ./tsconfig.json ./webpack.config.js ./
COPY ./client ./client
COPY ./src ./src

RUN yarn build
RUN yarn client-build

FROM node:18.8.0-alpine as runner

WORKDIR /app

COPY package.json ./
COPY --from=deps /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist
COPY --from=build /app/static ./static

CMD ["yarn", "start"]