FROM node:20-alpine

COPY package.json /api/package.json
COPY tsconfig.json /api/tsconfig.json
WORKDIR /api
ENV PORT=8000
ENV KEY=PDFGenerateKey
RUN npm install
RUN npm install -g nodemon
RUN apk update && apk add bash

EXPOSE 8000

CMD ["npm", "run", "dev"]