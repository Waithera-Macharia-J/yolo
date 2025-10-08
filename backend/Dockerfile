# Stage 1: Build dependencies
FROM node:14-alpine AS build

WORKDIR /usr/src/app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy app source code
COPY . .

# Stage 2: Runtime environment
FROM alpine:3.16.7

WORKDIR /app

# Install Node.js runtime only
RUN apk add --no-cache nodejs

# Copy app files from build stage
COPY --from=build /usr/src/app /app

# Expose backend port
EXPOSE 5000

# Run the app
CMD ["node", "server.js"]
