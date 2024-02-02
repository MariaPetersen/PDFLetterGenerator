FROM node:20-alpine

WORKDIR /front
COPY package.json .
COPY tsconfig.json .

RUN npm install

CMD ["npm", "start"]
