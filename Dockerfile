FROM node:16.20.0-alpine AS dependencies

RUN apk add --no-cache libc6-compat python3
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_STRIPE_KEY
ARG NEXT_PUBLIC_PAYPAL_CLIENT_ID

ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_STRIPE_KEY=$NEXT_PUBLIC_STRIPE_KEY
ENV NEXT_PUBLIC_PAYPAL_CLIENT_ID=$NEXT_PUBLIC_PAYPAL_CLIENT_ID

WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* next.config.js \
    next-sitemap* store-config.js store.config.json store-config* validation.txt robots.txt ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


FROM node:16.20.0-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN npm install --legacy-peer-deps

ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_STRIPE_KEY
ARG NEXT_PUBLIC_PAYPAL_CLIENT_ID

ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_STRIPE_KEY=$NEXT_PUBLIC_STRIPE_KEY
ENV NEXT_PUBLIC_PAYPAL_CLIENT_ID=$NEXT_PUBLIC_PAYPAL_CLIENT_ID
RUN echo ENV VARS: api_key $NEXT_PUBLIC_MEDUSA_BACKEND_URL  $NEXT_PUBLIC_STRIPE_KEY


RUN touch .env && \
    echo "NEXT_PUBLIC_MEDUSA_BACKEND_URL=${NEXT_PUBLIC_MEDUSA_BACKEND_URL}" >> .env && \
    echo "NEXT_PUBLIC_STRIPE_KEY=${NEXT_PUBLIC_STRIPE_KEY}" >> .env && \
    echo "NEXT_PUBLIC_PAYPAL_CLIENT_ID=${NEXT_PUBLIC_PAYPAL_CLIENT_ID}" >> .env

RUN npm run build

FROM node:16.20.0-alpine as runner
WORKDIR /app
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/store.config.json ./store.config.json
COPY --from=builder /app/store-config.js ./store-config.js
COPY --from=builder /app/next-sitemap.js ./next-sitemap.js
COPY --from=builder /app/robots.txt ./robots.txt
COPY --from=builder /app/validation.txt ./validation.txt

EXPOSE 3000
CMD ["npm", "start"]