FROM node:18-alpine
WORKDIR /app
RUN npm install -g @angular/cli@14
COPY package*.json ./
RUN npm install
RUN npm run build
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
