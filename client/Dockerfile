FROM node:18.12-alpine AS base
WORKDIR /app

RUN apk add --no-cache python3 py3-pip make g++
ENV PYTHON /usr/bin/python3

COPY package*.json .
RUN npm install
COPY types .
COPY public .
COPY *.d.ts .
COPY *.yml .
COPY *.js* .
COPY .env* .
COPY src .
COPY . .

FROM base AS development
ENV NODE_ENV=development

FROM base AS production
ENV NODE_ENV=production
RUN npm run build
RUN npm prune --production