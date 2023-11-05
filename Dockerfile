FROM node:18-alpine

WORKDIR /app

EXPOSE 4300

COPY package*.json /app/

RUN npm install

COPY . ./

ARG PROD=true

ARG TARGET=prod

RUN npm run build:${TARGET}

ENV TARGET=${TARGET}

# CMD ["npm", "run", "start:$TARGET"]

CMD [ "sh", "-c", "npm run start:${TARGET}" ]
