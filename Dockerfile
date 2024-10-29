FROM node:20.4-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
RUN npm install -g ts-node
COPY . .
EXPOSE 3333
CMD ["npm", "start"]