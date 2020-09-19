FROM debian:stretch

ARG NODE_ENV=local
ENV NODE_ENV=${NODE_ENV}

RUN apt-get update && \
    apt-get install -y procps curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# install nodejs and npm
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

ARG LOCAL_USER_ID
ARG LOCAL_GROUP_ID

RUN groupadd -g ${LOCAL_GROUP_ID} ${LOCAL_USER_ID}
RUN useradd -u ${LOCAL_USER_ID} -g ${LOCAL_GROUP_ID} -ms /bin/bash ${LOCAL_USER_ID}

WORKDIR /usr/src/app

USER ${LOCAL_USER_ID}

EXPOSE 3000
