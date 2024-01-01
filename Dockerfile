# Use official node image as the base image
FROM node:18.13.0 as build
# Set the working directory
WORKDIR /app
COPY . .
RUN npm install
# Generate the build of the application
RUN npm run build --prod

# Stage 2: Serve app with nginx server
FROM nginx:1.17

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /code

COPY --from=build /app/dist/ROSAHEALTHApp .

EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
