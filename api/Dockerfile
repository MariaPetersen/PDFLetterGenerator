FROM node:20-alpine

COPY package.json /api/package.json
WORKDIR /api
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]