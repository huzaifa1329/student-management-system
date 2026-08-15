## Student Management System

A modern, responsive Student Management System built with React and a Node.js/Express backend, with MongoDB Atlas used for persistent data storage.

Project Overview

This project provides an administrative interface for managing student records. The application supports authentication, dashboard statistics, student search, and complete CRUD operations.

The project was developed as part of a web development internship and was deployed using GitHub and Vercel.

## Features

Admin login

Dashboard

Student listing

Student search

Add student

Edit/update student

Delete student

MongoDB Atlas database integration

REST API integration

Responsive interface

Client-side routing

Production deployment

Git/GitHub version control

Technology Stack

Frontend

React

Vite

React Router

JavaScript

HTML5

CSS3

Backend

Node.js

Express.js

REST API

JavaScript

Database

MongoDB Atlas

Development & Deployment

Git

GitHub

Vercel

VS Code

## Project Structure

``` text

student-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── vercel.json
│
├── .gitignore
└── README.md

```

## API Integration

The frontend communicates with the backend through REST endpoints.

Method

Endpoint

Purpose

GET

/students

Retrieve all students

GET

/students/:id

Retrieve a single student

POST

/students

Add a student

PUT

/students/:id

Update a student

DELETE

/students/:id

Delete a student

The frontend service layer is implemented in:

frontend/src/services/studentService.js

The React StudentContext manages loading, adding, updating, deleting, and refreshing student data.

Database

MongoDB Atlas is used for persistent student data.

The backend reads the database connection string from an environment variable:

MONGO_URI=your_mongodb_connection_string

Sensitive credentials are not stored in the GitHub repository.

MongoDB Atlas requires client connections to originate from addresses permitted by the project's IP Access List.

## Deployment

Frontend

Production frontend:

https://student-management-system-foz7.vercel.app/

Backend

Production backend:

https://student-management-system-two-jet.vercel.app/

Repository

GitHub:

https://github.com/huzaifa1329/student-management-system

Authentication Behaviour

The application keeps the login state in browser storage. Therefore, if the user closes the browser/tab without logging out, reopening the application can restore the logged-in dashboard.

Logging out clears the application's login state.

Client-Side Routing

The frontend uses React Router for navigation.

For production deployment, the Vercel SPA rewrite configuration allows routes such as /dashboard and /students to continue working when directly opened or refreshed.

Version Control

Git was used throughout the project for version control.

Typical workflow:

git status
git add .
git commit -m "Describe the change"
git push origin main

The main branch is connected to the production deployment.

Testing Completed

The production application was tested for:

Login

Dashboard loading

Student data loading

Add student

Edit student

Delete student

Search

Page refresh on application routes

MongoDB persistence

Frontend/backend communication

All core functionality was confirmed working in the final deployed version.

Environment Variables

Do not commit .env files containing secrets.

Example:

MONGO_URI=your_mongodb_connection_string
PORT=3000

For Vercel, environment variables must be configured in the project's Environment Variables settings.

Future Improvements

Possible future enhancements include:

Role-based authentication

Pagination

Advanced filtering

Student profile pages

Export to PDF/Excel

Attendance management

Result management

Email notifications

Automated testing

Improved analytics

Internship Outcome

The project demonstrates practical experience with:

React frontend development

REST API integration

Node.js and Express

MongoDB Atlas

CRUD operations

Git/GitHub

Vercel deployment

Environment variable management

Production debugging and testing