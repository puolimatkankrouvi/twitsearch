FROM node:12

# Set the container working directory
WORKDIR /usr/src/twitsearch/server

# Copy dependencies
COPY package*.json ./

# Run command npm install (/bin/sh -c)
RUN npm install

# Copy rest of the files
COPY . .

# Expose port 8000 for docker daemon to listen the port
EXPOSE 8000

# Run .
CMD ["npm", "start"]