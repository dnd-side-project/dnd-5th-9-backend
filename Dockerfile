FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./
COPY . .

RUN npm i
RUN npm i -g pm2
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
