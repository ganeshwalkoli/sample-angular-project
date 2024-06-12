# Base image
FROM nginx:alpine

# Copy the tar.gz file into the Docker image
COPY ndml-kra-fe.tar.gz /usr/share/nginx/html/

# Change to the Nginx HTML directory and extract the tar.gz file
WORKDIR /usr/share/nginx/html
RUN tar xzvf ndml-kra-fe.tar.gz

# Expose port 80
EXPOSE 80
