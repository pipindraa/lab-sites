#!/bin/sh
set -e

sed -i "s/8080/$PORT/g" /etc/nginx/conf.d/default.conf

node server.js &
NODE_PID=$!

nginx -g 'daemon off;' &
NGINX_PID=$!

trap "kill $NODE_PID $NGINX_PID 2>/dev/null" TERM INT
wait -n $NODE_PID $NGINX_PID