FROM node:20

WORKDIR /build

COPY package*.json .
RUN npm install

COPY src/ src/
COPY public/ public/
COPY .env .env

RUN npm run build

RUN npm run start