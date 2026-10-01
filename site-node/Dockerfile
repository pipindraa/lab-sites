FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server.js ./
COPY public ./public
COPY views ./views
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh && mkdir -p /usr/share/nginx/html

ENV APP_PORT=3000
EXPOSE 10000
CMD ["/app/start.sh"]