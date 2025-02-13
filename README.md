# Speak Easy API
#This is a node js API that handles user Registration (creation) and user Authentication

##Features
User registration and login (JWT authentication)
The API makes use of Express to define our routes for different HTTP methods
For password hashing, we make use of (Argon2)
Reducing the size of a file (compression)
Loading environmental variables from our .env file, into our NODE.js application (dotenv)
List Routes (express-list-routes)
We make use of (Express-rate-limiter) to limit the number of log in requests that a user can make whthin a certain time frame
we used (JOI) to define validation rules
We create and verify token using (jsonwebtoken)
Database interaction (Mongoose)

##To run this project, you will need to add the following environmental variables to your .env file
NODE_ENV
PORT
MONGO_DB
JWT_SECRET
JWT_EXPIRES_IN

##Install dependencies, copy the .env file and populate the variables, then start your application.

npm install
cp .env.example .env
npm run start:dev
