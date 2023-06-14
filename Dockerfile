FROM node:20.3.0-alpine as development

WORKDIR /usr/src/bot

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20.3.0-alpine as production

ENV NODE_ENV production

WORKDIR /usr/src/bot

COPY package.json .

RUN npm install --only=production

COPY --from=development /usr/src/bot/dist ./dist

CMD ["node", "dist/index.js"]