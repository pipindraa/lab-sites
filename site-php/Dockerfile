FROM php:8.3-apache
COPY . /var/www/html/
EXPOSE 10000
# Render пробрасывает порт в $PORT (по умолчанию 10000) — переводим Apache на него
CMD sed -i "s/80/$PORT/g" /etc/apache2/sites-enabled/000-default.conf /etc/apache2/ports.conf && docker-php-entrypoint apache2-foreground
