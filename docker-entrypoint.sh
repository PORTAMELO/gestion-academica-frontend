#!/bin/sh
API_URL=${VITE_API_URL:-http://localhost:8080/api}
find /usr/share/nginx/html -name "*.js" -exec sed -i "s|http://localhost:8080/api|${API_URL}|g" {} \;
nginx -g "daemon off;"
