FROM node:16-alpine as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -f

ENV TZ=America/Sao_Paulo
RUN apk update \
    && apk upgrade \
    && apk add --no-cache tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

RUN date

COPY . .
RUN npm run build

FROM nginx:alpine

ENV PUBLIC_HTML=/usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY .docker/nginx.conf /etc/nginx/conf.d/

COPY --from=build-deps /usr/src/app/build ${PUBLIC_HTML}

EXPOSE 80
