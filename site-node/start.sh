#!/bin/sh
set -e

sed -i "s/8080/$PORT/g" /etc/nginx/conf.d/default.conf

node server.js &

nginx -g 'daemon off;' &
NGINX_PID=$!

trap "kill $NGINX_PID 2>/dev/null" TERM INT
wait $NGINX_PID