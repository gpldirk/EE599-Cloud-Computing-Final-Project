FROM node:16-alpine3.11

RUN npm install supervisor -g

RUN mkdir -p /tiny

WORKDIR /tiny

ADD . /tiny

RUN cd /tiny && npm install

EXPOSE 8000

CMD ["supervisor", "/tiny/server.js"]