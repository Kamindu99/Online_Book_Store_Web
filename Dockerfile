# Use a lightweight Node.js base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy just the package.json and yarn.lock files to take advantage of caching
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the React TypeScript application
RUN yarn build

# Expose the port on which your React application will run (if necessary)
EXPOSE 3000

# Start the React application
CMD ["yarn", "start"] 