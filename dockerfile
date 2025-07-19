FROM node:18-bullseye as build

ARG VITE_APP_API_URL

WORKDIR /app
COPY package*.json ./
RUN npm ci

RUN echo "VITE_APP_API_URL=${VITE_APP_API_URL}" > .env.production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]