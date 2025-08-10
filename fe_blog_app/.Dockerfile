# ===== Build stage =====
FROM node:20-alpine AS build

# Cập nhật hệ thống & cài gói cần thiết
RUN apk update && apk upgrade && \
    apk add --no-cache curl && \
    mkdir -p /app && chown -R node:node /app

WORKDIR /app
USER node

# Copy package files trước để tận dụng cache
COPY --chown=node:node package*.json ./

# Cài dependencies & vá bảo mật
RUN npm ci --ignore-scripts && \
    npm audit fix --force --audit-level=critical

# Copy toàn bộ source code
COPY --chown=node:node . .

# Build Angular ở chế độ production
RUN npm run build -- --configuration production


# ===== Production stage =====
FROM nginx:1.27-alpine

# Cập nhật hệ thống và xóa file config mặc định
RUN apk update && apk upgrade && \
    rm -rf /etc/nginx/conf.d/* /var/cache/apk/*

# Tạo user non-root cho Nginx
RUN addgroup -S nginx && adduser -S nginx -G nginx

# Copy file cấu hình Nginx tùy chỉnh
COPY nginx.conf /etc/nginx/nginx.conf

# Copy security headers
COPY security-headers.conf /etc/nginx/conf.d/security-headers.conf

# Copy build từ stage trước
COPY --from=build --chown=nginx:nginx /app/dist/reddit-clone-frontend /usr/share/nginx/html

# Chuyển quyền thư mục để chạy non-root
RUN chown -R nginx:nginx /usr/share/nginx/html

# Chạy container với user non-root
USER nginx

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

# Expose port
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
