# Use an official Node.js runtime as the base image
FROM node:18-alpine as BUILD_IMAGE

# Set the working directory in the container
WORKDIR /app/react-app

# Copy package.json and package-lock.json to the container
COPY package*.json .

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application
RUN npm run build

FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app/react-app

COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/
# Expose the port your React app will run on
EXPOSE 8080
COPY package*.json .
COPY vite.config.ts .

RUN npm install typescript

EXPOSE 8080
CMD [ "npm", "run", "preview" ]
