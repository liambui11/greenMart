# Dockerfile

# Base image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Build production
RUN npm run build

# Serve bằng nginx
FROM nginx:stable-alpine

# Copy build React sang nginx folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình nginx (nếu có)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
