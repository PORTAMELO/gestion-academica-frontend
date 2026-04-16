#!/bin/sh
find /usr/share/nginx/html -name "*.js" -exec sed -i "s|http://localhost:8080/api|${VITE_API_URL}|g" {} \;
nginx -g "daemon off;"