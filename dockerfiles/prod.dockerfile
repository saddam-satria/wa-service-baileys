FROM node:20.10-alpine as builder

WORKDIR /app/sitiket-backend

COPY package*.json ./

COPY yarn*.lock ./

RUN yarn install

COPY tsconfig.build*.json ./

COPY tsconfig*.json ./

COPY prisma ./prisma

RUN yarn prisma generate

COPY src ./src

RUN yarn build

FROM node:20.10-alpine as server 

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont 

WORKDIR /app/sitiket-backend

COPY public ./public

COPY templates ./templates

COPY --from=builder /app/sitiket-backend/build ./build

COPY --from=builder /app/sitiket-backend/node_modules ./node_modules

COPY externals/service-account.json ./externals/service-account.json

COPY internals/app-cost.json ./internals/app-cost.json

COPY internals/versions.json ./internals/versions.json

COPY auth_info_baileys ./auth_info_baileys

RUN mkdir logs

CMD [ "node", "build/main" ]