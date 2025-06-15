FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public ./public
COPY src ./src
COPY .env ./

EXPOSE 3001
CMD ["npm", "start"]
