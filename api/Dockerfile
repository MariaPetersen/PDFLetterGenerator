FROM node:20-alpine

COPY package.json /api/package.json
COPY tsconfig.json /api/tsconfig.json
WORKDIR /api
RUN npm install
RUN npm install -g nodemon

EXPOSE 8000

CMD ["npm", "run", "dev"]