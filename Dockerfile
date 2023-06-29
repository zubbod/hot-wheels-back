FROM node:18-alpine

WORKDIR /app

EXPOSE 4300

COPY package*.json /app/

RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "run", "start:prod"]
