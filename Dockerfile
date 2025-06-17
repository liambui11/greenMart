# Base image nhẹ dùng nginx để chạy web tĩnh
FROM nginx:stable-alpine

# Copy build vào thư mục web root của nginx
COPY build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng 80 (http)
EXPOSE 80

# Lệnh mặc định chạy nginx
CMD ["nginx", "-g", "daemon off;"]