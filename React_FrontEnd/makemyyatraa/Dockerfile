# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents to /app
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 80

# Run npm start when the container launches
CMD ["npm", "start"]
