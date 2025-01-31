FROM --platform=linux/arm64 node:20-alpine
# FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install required dependencies for compiling SQLite3
RUN apk add --no-cache python3 make g++ sqlite

# Install dependencies
RUN npm install

# Force SQLite3 to build from source (fixes architecture issues)
RUN npm install --build-from-source sqlite3

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"] 