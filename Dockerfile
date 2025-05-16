# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port (default 3000)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
