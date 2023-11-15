node v18.14.1
sudo docker run -e SERVER_PORT=5522 -e DB_HOST=localhost -e DB_PORT=3306 -e DB_USER=root -e DB_PASSWORD=root -e DB_NAME=local -p 5522:5522 gcp-test
