FROM node:11.15.0-stretch

RUN mkdir -p /app/brand-report-web
WORKDIR /app/brand-report-web

COPY package*.json /app/brand-report-web/

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org  && \
    cnpm install

COPY . /app/brand-report-web

CMD ["cnpm", "start"]