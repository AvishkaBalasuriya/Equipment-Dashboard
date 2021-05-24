# How to run
###### Run with docker
- Clone the project
- Go to the root of project which contains docker-compose.yml file
- In terminal, Type docker-compose up --build
- Go to the web browser and type http://localhost/

###### Run without docker
- Clone the project
- Navigate to backend folder
- Go to the config folder and open default.json file
- Put your mongodb connection string under mongodb.connectionUrl
- In terminal type, npm i and wait till complete
- In terminal type, node server.js (This will up the NodeJS server)
- Go to the frontend folder
- Go to src folder
- Open config.json file and put NodeJS server host. Default is http://localhost:3000
- In terminal type, npm i and wait till complete
- In terminal, Enter npm run start
- Go to the http://localhost:3001/

# Default Credentials
###### Admin
- Email:- "iviva-admin@gmail.com"
- Password:- "Iviva@demo1"

###### User
- Email:- "iviva-user@gmail.com"
- Password:- "Iviva@demo1"

# About
I create this project using NodeJS and React. I used redux to manage states inside the app and I create redux states persistant using localstorage with my own implementation. I did't use any frontend input validation. All the validations are done by backend. I intergrate this dashboard with basic authentication system which has functionality like login,register,verify profile,reset password. Backend APIs are protected using JWT authentication. I used MongoDB to store user data and OTP related data. Also NodeJS server is fetching data from Iviva API on every 1 minute. I assume data changed realtime. Then NodeJS server emit those new data to ReactJS using socket.io realtime communication. So whenever new data comes to server frontend will be automatically updated
