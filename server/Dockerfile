FROM node:16 as build

WORKDIR /app

COPY . .

RUN yarn install && yarn build

FROM node:16 as prod

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY --chown=node:node --from=build /app/dist /app/dist

COPY --chown=node:node --from=build /app/package*.json /app/

RUN yarn install --only=prod

CMD ["yarn", "start"]