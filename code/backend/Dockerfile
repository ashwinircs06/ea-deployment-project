FROM node:20.3.1
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]
