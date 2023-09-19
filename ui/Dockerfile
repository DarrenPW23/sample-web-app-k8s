# Use an official Nginx image as the base image
FROM nginx:latest

# Copy your website files to the Nginx document root directory
COPY . /usr/share/nginx/html

# Expose port 80 to allow external access to the Nginx server
EXPOSE 80

# Start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]
