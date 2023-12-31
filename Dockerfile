# Stage 1: Compile and Build
FROM node:20-alpine as build
# Set the working directory
WORKDIR /usr/local/app
# Add the source code to app
COPY package*.json ./
# Install all the dependencies
RUN npm install -g @angular/cli@14
#### install project dependencies
RUN npm install
COPY . .
# Generate the build of the
RUN npm run build --prod

# Stage 2: Serve app with nginx
FROM nginx:latest

FROM nginxinc/nginx-unprivileged

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist/ROSAHEALTHApp/ /usr/share/nginx/html

EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
# Copy the build output to
#COPY --from=build /usr/local/app/dist/ROSAHEALTHApp /usr/share/nginx/html
# Expose port 80
# Expose 80
