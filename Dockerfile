# Base image
FROM nginx:alpine

# Copy built Angular files to Nginx's HTML directory
COPY ./dist/emp-crud /usr/share/nginx/html

# Copy a custom Nginx configuration file (optional)
# COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80
