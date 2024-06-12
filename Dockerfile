# Base image
FROM nginx:latest

# Copy built Angular files to Nginx's HTML directory
# COPY /var/jenkins_home/workspace/test_dockerfile/ndml-kra-fe.tar.gz /usr/share/nginx/html
COPY /home/dockerized_web/ndml-kra-fe.tar.gz /usr/share/nginx/html
RUN cd /usr/share/nginx/html
RUN tar xzvf ndml-kra-fe.tar.gz

# Copy a custom Nginx configuration file (optional)
# COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80
