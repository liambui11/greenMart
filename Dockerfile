
FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public ./public
COPY src ./src
COPY .env ./


# Cài `serve` để chạy ứng dụng production
RUN npm install -g serve

# Expose port 3001
EXPOSE 3001

# Khởi chạy ứng dụng với serve, lắng nghe 0.0.0.0 để container có thể truy cập từ bên ngoài
CMD ["serve", "-s", "build", "--listen", "0.0.0.0:3001"]
