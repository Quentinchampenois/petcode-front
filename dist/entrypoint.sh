#!/bin/sh

j2 /etc/nginx/conf.d/nginx.conf.j2 > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
