FROM node:18 as build
# Объявляем аргумент
ARG VITE_APP_API_URL
# Создаем .env файл из аргумента
RUN echo "VITE_APP_API_URL=$VITE_APP_API_URL" > .env.production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]