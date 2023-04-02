FROM node:18.15.0-alpine

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node

WORKDIR /usr/src/app
COPY package*.json .
RUN  npm install
COPY . .
RUN cp env-example .env
RUN npm run build

CMD [ "node", "dist/main.js" ]
