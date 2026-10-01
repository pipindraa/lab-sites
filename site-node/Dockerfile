# Образ по мотивам node:20-alpine: ставим nginx и гоняем его перед Express
FROM node:20-alpine

WORKDIR /app

# сначала только манифест — слой с зависимостями кешируется между сборками
COPY package.json ./
RUN npm install --omit=dev

COPY server.js ./
COPY public ./public
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh && mkdir -p /usr/share/nginx/html

ENV APP_PORT=3000
EXPOSE 10000
CMD ["/app/start.sh"]