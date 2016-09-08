FROM alpine:latest

RUN apk add --no-cache nodejs
RUN apk add --no-cache curl

RUN npm install -g pm2

WORKDIR /opt/application

COPY ./package.json ./package.json
RUN npm install

COPY ./index.js ./index.js

CMD pm2 start --no-daemon ./index.js