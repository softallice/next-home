db 실행
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=ndshome -d -p 3306:3306 mysql:latest

docker exec -it mysql-container mysql -u root -p

CREATE DATABASE strapi;

CREATE USER 'strapiuser'@'localhost' IDENTIFIED BY 'strapiuser';


GRANT ALL PRIVILEGES ON strapi.* TO 'strapiuser'@'localhost';

FLUSH PRIVILEGES;


cd apps/strapi
cp .env.example .env
echo "APP_KEYS="`openssl rand 16 | base64`","`openssl rand 16 | base64`","`openssl rand 16 | base64`","`openssl rand 16 | base64` >> .env
echo "API_TOKEN_SALT="`openssl rand 16 | base64` >> .env
echo "ADMIN_JWT_SECRET="`openssl rand 16 | base64` >> .env
echo "TRANSFER_TOKEN_SALT="`openssl rand 16 | base64` >> .env
echo "JWT_SECRET="`openssl rand 16 | base64` >> .env


------------------------------
ALTER USER 'strapiuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'strapiuser';
FLUSH PRIVILEGES;
--------------------
exit
