# MERN Role-Based CRUD

- A full-stack MERN (MongoDB, Express, React, Node.js) application implementing role-based access control (RBAC) with CRUD operations. This project allows user registration, authentication, and role management with permissions for roles such as Admin, Super Admin, Manager, Employee, and Staff.

🚀 Features

- User registration and login with JWT authentication

- Role-based access control (RBAC) for secure route protection

- Admin and Super Admin can manage user roles

- CRUD operations for user management

- React frontend with dynamic role-based UI rendering

- MongoDB for data persistence

🗂️ Project Structure

```
MERN-Role-based-CRUD/
├── backend/ # Express server and API routes
│ ├── index.js # Main server file
│ └── ... # Other backend files and folders
└── frontend/mern-role-based-crud/ # React frontend application
├── src/
│ ├── components/ # Reusable React components
│ ├── pages/ # React pages (e.g., AllUsers)
│ ├── hooks/ # Custom React hooks (e.g., useUsers, useAxiosPublic)
│ └── ... # Other frontend files and folders
```

⚙️ Prerequisites

- Ensure you have the following installed on your machine:

- Node.js (v14 or higher)

- npm or yarn

- MongoDB (Atlas)

## Download the project

`git clone https://github.com/abir045/MERN-Role-based-CRUD.git`

🛠️ Backend Setup

- Navigate to the backend directory:

`cd backend`
Install dependencies:

`npm install`

- Configure environment variables:

- Create a .env file in the backend directory with the following content:

DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=your_jwt_secret_key
Replace your_mongodb_username, your_mongodb_password, and your_jwt_secret_key with your actual MongoDB credentials and a secure JWT secret key.

- Start the backend server:

`nodemon index.js`
The server should now be running at http://localhost:5000.

🌐 Frontend Setup

- Navigate to the frontend directory:

`cd frontend/mern-role-based-crud`

- Install dependencies:

`npm install`
Start the frontend development server:

`npm start`
The React application should now be running at http://localhost:3000.

🔐 Authentication & Authorization

- JWT Authentication: Users receive a JWT upon successful login, which is stored in localStorage and included in the Authorization header for protected routes.

- Role-Based Access Control (RBAC): Middleware functions on the backend verify user roles to control access to specific routes. For example, only users with the roles "Admin" or "Super Admin" can edit other users' roles.

📬 API Endpoints
POST /jwt: Generate JWT token upon login

GET /users: Retrieve all users

POST /api/register: Register a new user

PATCH /api/users/:id: Update a user's role (Admin/Super Admin only)

GET /users/checkAdmin/:email: Check if a user is an Admin

GET /users/role/:email: Retrieve a user's role

🧪 Testing the Application
Register a new user:

Navigate to the registration page and create a new user account.

Login:

Use the registered credentials to log in. A JWT token will be stored in localStorage.

## Admin credentials

email: abir_imran@gmail.com
pass: 123456

- Access protected routes:

Depending on the user's role, access to certain routes and functionalities will be granted or restricted.

Role Management:

If logged in as an Admin or Super Admin, navigate to the "All Users" page to edit other users' roles.
