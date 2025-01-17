FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install --only=dev

COPY . .

RUN npm install vite -g

RUN npm run build:Prod
RUN npm install -g serve

EXPOSE 8081

CMD serve -s dist -l 8081