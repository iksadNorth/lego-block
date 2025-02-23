FROM nginx:latest

COPY dist /usr/share/nginx/html
COPY docker/nginx.conf.template /etc/nginx/nginx.conf.template

EXPOSE 80
CMD cat /etc/nginx/nginx.conf.template | envsubst '$API_SVR_URL $API_SVR_PORT' > /etc/nginx/nginx.conf && \
nginx -g 'daemon off;'
