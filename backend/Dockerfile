# Build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# Production stage
FROM alpine:3.16.7

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY --from=build /usr/src/app .

EXPOSE 3000

CMD ["npm", "start"]
