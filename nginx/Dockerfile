FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

RUN apt-get update

CMD ["nginx", "-g", "daemon off;"]