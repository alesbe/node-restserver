FROM node:18-alpine

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Move source code to workdir
COPY . .

# Server configs
ENV PORT=8000
EXPOSE 8000

# Start server
WORKDIR ./server
CMD ["npm", "start"]
