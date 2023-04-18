FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli
RUN npm install -g @angular/compiler
RUN npm install --force
COPY . .
RUN ng build



FROM nginx:alpine
COPY --from=build /app/dist/vm_manager_frontend /usr/share/nginx/html
COPY vm_manager_frontend.conf /etc/nginx/conf.d/default.conf