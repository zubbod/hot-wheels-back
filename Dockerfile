FROM node:18-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . .

RUN npm run prebuild

RUN npm run build

CMD ["npm", "run", "start:dev"]
