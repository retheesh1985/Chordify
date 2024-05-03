# Chordify
# Chordify Assessment
# Node.js API with MySQL Integration and Cron Job

The task is to create a simple RESTful API using Node.js that interacts with a MySQL
database. This API will manage a simple resource: users. Each user should have at
least the following attributes: id, name, email, and created_at. Along with this API, also
set up a cron job that performs a routine database maintenance task.

# Prerequisites
1. Node.js installed on your machine. You can download it from nodejs.org.
2. MySQL server installed and running on your machine.

# Setup
1. Clone the repository:
git clone <repository-url>
2. Navigate to the project directory:
cd <project-directory>
3. Install dependencies:
npm install

# Setup DB
CREATE DATABASE Chordify;
USE Chordify;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Test1234#';

# Running the Application
To start the Node.js server, run the following command:
npm start
The server will start running on port 3000 by default.

# API Endpoints
GET /users: Retrieve all users.
GET /users/:id: Retrieve a user by ID.
POST /users: Create a new user. Required body parameters: name and email.
PUT /users/:id: Update user data by ID. Required body parameters: name and/or email.
DELETE /users/:id: Delete a user by ID.

# API Endpoint Usage
You can use tools like Postman or curl to interact with the API endpoints. Here are some example requests:

1. Create a new user:
curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com"}' http://localhost:3000/users
2. Retrieve all users:
curl http://localhost:3000/users
3. Retrieve user by Id:
curl http://localhost:3000/users/1
4. Update user data:
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Jane Doe"}' http://localhost:3000/users/1
5. Delete a user:
curl -X DELETE http://localhost:3000/users/1

# Cron Job
A cron job is also set up for check whether  new users created in a day, the cron runs on 12 Midnight.