FROM node:18-bullseye as build

ARG VITE_APP_API_URL

WORKDIR /app

RUN echo "VITE_APP_API_URL=${VITE_APP_API_URL}" > .env.production

COPY package*.json ./
RUN npm ci
COPY . .

ENV VITE_APP_API_URL=${VITE_APP_API_URL}

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]