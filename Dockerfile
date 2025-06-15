FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public ./public
COPY src ./src
COPY .env ./

# 👉 Tăng giới hạn bộ nhớ lên 1.5GB
ENV NODE_OPTIONS="--max-old-space-size=1536"

# Build ứng dụng React
RUN npm run build

# Cài `serve` để chạy app production
RUN npm install -g serve

EXPOSE 3001

CMD ["serve", "-s", "build", "--listen", "0.0.0.0:3001"]
