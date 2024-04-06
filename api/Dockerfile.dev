FROM node:20-alpine

COPY package.json /api/package.json
COPY tsconfig.json /api/tsconfig.json
WORKDIR /api
ENV PORT=8000
ENV KEY=PDFGenerateKey
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      npm
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm install
RUN npm install -g nodemon

RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app
USER pptruser

EXPOSE 8000

CMD ["npm", "run", "dev"]