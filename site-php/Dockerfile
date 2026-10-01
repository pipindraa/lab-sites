FROM php:8.3-apache
COPY . /var/www/html/
EXPOSE 10000
CMD sed -i "s/80/$PORT/g" /etc/apache2/sites-enabled/000-default.conf /etc/apache2/ports.conf && docker-php-entrypoint apache2-foreground
