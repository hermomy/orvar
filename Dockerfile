FROM nginx:alpine
RUN apk add --no-cache bash
RUN apk add --no-cache nano
COPY ./build /usr/share/nginx/html
