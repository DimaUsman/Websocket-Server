# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Make port 5356 available outside the container
EXPOSE 5356

# Define environment variable
ENV NAME luxms-websocket
ENV port 5356

# Run the app when the container launches
CMD ["node", "index_ws.js"]