FROM node:18

# Working Directory
WORKDIR /usr/src/app

# Copy Package JSON  Files
COPY package*.json ./

# Install Files
RUN npm install

# Copy Source Files
COPY . .

# Build
RUN npm run build

# Expose the API Port
EXPOSE 5000

CMD [ "node", "build/server.js" ]