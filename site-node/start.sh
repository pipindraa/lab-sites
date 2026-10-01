#!/bin/sh
# Ставит nginx на порт, который задал хостинг, и поднимает Node как апстрим.
set -e

# Render передаёт порт в $PORT (по умолчанию 10000). nginx в образе слушает 8080 —
# переписываем, иначе health-check не достучится и сервис упадёт.
sed -i "s/8080/$PORT/g" /etc/nginx/conf.d/default.conf

# Запуск Node в фоне, чтобы nginx был PID 1 и принимал трафик сразу
node server.js &
NODE_PID=$!

# nginx -g 'daemon off;' — работает на переднем плане (его ждёт контейнер)
nginx -g 'daemon off;' &
NGINX_PID=$!

# Если любой из двух процессов упал — умирает весь контейнер (Restart policy)
trap "kill $NODE_PID $NGINX_PID 2>/dev/null" TERM INT
wait -n $NODE_PID $NGINX_PID