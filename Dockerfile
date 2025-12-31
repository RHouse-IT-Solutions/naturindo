# Use an official Node.js runtime as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

RUN npm ci

# Build the Next.js application
RUN npm run build          # creates .next

# Expose the port Next.js listens on
EXPOSE 3000

# Command to start the Next.js server
#CMD npm start
CMD ["npm", "start"]
