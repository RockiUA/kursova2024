FROM node:18.12-alpine AS base
WORKDIR /app
COPY package*.json .
RUN npm install
COPY *.gql .
COPY .env* .
COPY .* .
COPY src .
COPY . .

FROM base AS development
ENV NODE_ENV=development

FROM base AS production
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=1024
RUN npm run build
RUN npm prune --production