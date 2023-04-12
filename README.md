# authenticate-me

Steps to setup locally:
npm install in /backend
create user with createdb privileges with credentials filled in .env file
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all

npm start to start backend api server

npm install in /frontend
npm start to start frontend server

Navigate to localhost://3000
