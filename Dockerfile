# Create node image v18.14.2
FROM node:18-alpine3.16

# Create app directory
WORKDIR /app

# Copy file to /app directory
COPY . /app

# install and build
RUN  npm install && npm run build

# run service
CMD ["npm", "run", "start"]