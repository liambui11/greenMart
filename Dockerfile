FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public ./public
COPY src ./src
COPY .env ./

RUN npm run build
RUN npm install -g serve

EXPOSE 3001
CMD ["serve", "-s", "build", "-l", "3001"]
