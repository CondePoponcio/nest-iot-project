FROM node:18 as builder
RUN apt update && apt install -y apt-transport-https ca-certificates sqlite3
WORKDIR /usr/src/app
RUN npm i -g @nestjs/cli
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
EXPOSE 9000
EXPOSE 80
CMD [ "npm", "run", "start:prod" ]