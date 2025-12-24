FROM node:21 AS build
WORKDIR /app
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm install && npm run build

# Etapa 2: imagen final liviana
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html