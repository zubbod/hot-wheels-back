FROM node:alpine

WORKDIR /app

EXPOSE 4300

COPY package*.json /app/

RUN npm ci

COPY . ./

RUN npm link @nestjs/cli

RUN npm run build

CMD ["npm", "run", "start:dev"]
