FROM node:20-alpine

WORKDIR /front
COPY package.json .
COPY tsconfig.json .
ENV REACT_APP_API=http://localhost:8000

RUN npm install

CMD ["npm", "start"]
