# prod lvl dockerfile ex

FROM node:14.15.4-alpine3.11 

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run start
