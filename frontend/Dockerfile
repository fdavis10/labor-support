# Этап 1: сборка фронтенда
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
# В production API с того же origin — пустая строка
ENV VITE_API_URL=
RUN npm run build

# Этап 2: Nginx с готовой статикой
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
