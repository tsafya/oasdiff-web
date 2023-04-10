#stage 1
FROM node:19 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/oasdiff-web /usr/share/nginx/html
