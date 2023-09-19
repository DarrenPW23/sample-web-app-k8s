# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application's source code to the container
COPY . .

# Expose the port that your Node.js API listens on (replace 3000 with your actual port)
EXPOSE 3000

# Define the command to start your Node.js API
CMD ["node", "index"]