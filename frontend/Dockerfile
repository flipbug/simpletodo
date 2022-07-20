FROM node:18-alpine3.15

WORKDIR /code
COPY package.json /code/
COPY package-lock.json /code/
RUN npm install 
COPY . /code/