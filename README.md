## ABC College Student Management System
#### Welcome to the ABC College Student Management System! This repository contains the source code for a web application designed to manage student details within ABC College.

### Table of Contents
1.Introduction
2.Technologies Used
3.Deployment Instructions
  1.Backend Setup
  2.Frontend Setup
  3.Database Setup

  
### Introduction
This web application allows staff members of ABC College to perform CRUD operations (Create, Read, Update, Delete) on student records. It includes features for adding new students, viewing existing records, updating information, and deleting entries. The backend is implemented using Node.js with Express and Sequelize for database management. The frontend is built using React.js.

### Technologies Used
#### Frontend: React.js, Axios
#### Backend: Node.js, Express.js, Sequelize (MySQL ORM)
#### Database: MySQL
#### Deployment: Docker (optional), AWS EC2 (recommended)
#### Deployment Instructions
 ##### Backend Setup:
Clone the repository.
Navigate to the backend directory.
Install dependencies using “npm install” or “npm i”.
Configure .env file for database connection (host, username, password, database name)..
Start the server: npm start.

#### Frontend Setup:
Navigate to the frontend directory.
Install dependencies using npm install.
Update API endpoint URLs if necessary (axios configuration).
Start the frontend development server: npm start.

#### Database Setup
MySQL Database Setup

Ensure MySQL server is installed on your system or accessible through a remote server.
Connect to MySQL and create a new database named abcd:
CREATE DATABASE abcd;
Schema Migrations
If you have schema migrations (SQL scripts) to create tables, execute them in your MySQL database.
Example schema for the Students table based on previous discussions:
sql
Copy code
CREATE TABLE Students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_number VARCHAR(255) NOT NULL,
  student_first_name VARCHAR(255) NOT NULL,
  student_last_Name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  email VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  StaffId INT,
  FOREIGN KEY (StaffId) REFERENCES Staff(id) ON UPDATE CASCADE
);

Ensure the MySQL user configured in your .env file (DB_USER) has appropriate privileges to access and modify the abcd database.
