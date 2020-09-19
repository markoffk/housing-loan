FROM debian:stretch

ARG NODE_ENV=demo
ENV NODE_ENV=${NODE_ENV}

RUN apt-get update && \
    apt-get install -y procps curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# install nodejs and npm
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

WORKDIR /usr/src/app

# we copy separately only package json and do npm ci
# to leverage Docker layer caching mechanism
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
