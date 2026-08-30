# BulldogEx Shop

BulldogEx Shop is a full-stack web application for browsing and managing music-related products.

The system allows customers to browse products, search by category, add products to their cart, place orders, submit reviews, and manage their profile.

Administrators can manage products, orders, reviews, and user accounts.

The application uses a React frontend connected to an Express and MongoDB backend with JWT authentication and role-based access control.

---

## Features

### Customer Features

Customers can:

- Register an account
- Login and logout
- Browse available products
- Search products
- Filter products by category
- View product details
- View customer reviews
- Add products to cart
- Remove products from cart
- Place orders
- View order history
- Track order status
- Submit product reviews
- View and update profile information
- Change account password

### Admin Features

Administrators can:

- Login and logout
- View products
- Create products
- Edit products
- View all customer orders
- Confirm orders
- Mark orders as ready for claiming
- View customer reviews
- Edit reviews
- View registered users
- Edit user information
- Change user roles
- Activate user accounts
- Deactivate user accounts

---

## Technologies Used

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Lucide React
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- MongoDB Atlas
- Mongoose
- JSON Web Token
- bcryptjs
- CORS
- dotenv

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MongoDB Atlas
- npm
- Nodemon

---

## Project Structure

```text
project-folder/
│
├── arellano-client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── arellano-server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Setup Instructions

Follow the steps below to set up and run BulldogEx Shop locally.

### Requirements

Before running the project, make sure the following are installed:

- Node.js
- npm
- Git
- Visual Studio Code or another code editor
- MongoDB Atlas account

Check if Node.js and npm are installed:

```bash
node --version
npm --version
```

Check if Git is installed:

```bash
git --version
```

### 1. Clone the Repository

Open a terminal and run:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the actual GitHub repository URL.

Example:

```bash
git clone https://github.com/username/repository-name.git
```

Then go inside the project folder:

```bash
cd <project-folder>
```

Replace `<project-folder>` with the actual folder name.

### 2. Set Up the Backend

Go to the backend folder:

```bash
cd arellano-server
```

Install the backend dependencies:

```bash
npm install
```

Inside the `arellano-server` folder, create a file named:

```text
.env
```

Add the following:

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
NODE_ENV=development
SALT=10
```

Replace:

```text
your_mongodb_connection_string
```

with your MongoDB Atlas connection string.

Replace:

```text
your_jwt_secret_key
```

with your own secret key.

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/BulldogEx
SECRET_KEY=your_secret_key_here
NODE_ENV=development
SALT=10
```

Do not upload your real `.env` values to GitHub.

### 3. Set Up MongoDB Atlas

BulldogEx Shop uses MongoDB Atlas as its database.

To configure MongoDB Atlas:

1. Sign in to MongoDB Atlas.
2. Create a project and database cluster if needed.
3. Open **Database Access**.
4. Create a database user.
5. Set a username and password.
6. Open **Network Access**.
7. Add your current IP address.
8. Return to your database cluster.
9. Click **Connect**.
10. Copy the MongoDB connection string.
11. Replace the username and password values.
12. Add the database name if needed.
13. Place the complete connection string inside `MONGO_URI` in the `.env` file.

Example format:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/BulldogEx
```

### 4. Protect the Environment File

Make sure `.env` is included in `.gitignore`.

Example:

```gitignore
node_modules/
.env
arellano-server/.env
.env.local
.env.*.local
```

The `.env` file should not be uploaded because it contains private information such as the MongoDB connection string and JWT secret key.

### 5. Start the Backend

Inside the `arellano-server` folder, run:

```bash
npm run dev
```

If successful, the terminal should display something similar to:

```text
Server running on port 8000
```

Keep this terminal running.

### 6. Set Up the Frontend

Open another terminal.

Go to the frontend folder:

```bash
cd arellano-client
```

Install the frontend dependencies:

```bash
npm install
```

### 7. Start the Frontend

Inside the `arellano-client` folder, run:

```bash
npm run dev
```

Vite should display a local address similar to:

```text
http://localhost:5173
```

Open the address in your browser.

### 8. Run the Full Application

Both the backend and frontend must be running at the same time.

Use two terminals.

Backend:

```bash
cd arellano-server
npm run dev
```

Frontend:

```bash
cd arellano-client
npm run dev
```

Then open:

```text
http://localhost:5173
```

in your browser.

---

## Authentication

The application uses JSON Web Token authentication.

After a successful login, the frontend stores:

```text
token
user
```

inside browser local storage.

Protected requests send the token using:

```http
Authorization: Bearer <token>
```

The backend verifies the token before allowing access to protected resources.

---

## Role-Based Access Control

The application supports two roles:

```text
customer
admin
```

### Customer

Customers can access:

- Products
- Cart
- Orders
- Reviews
- Profile

### Admin

Administrators can access:

- Product management
- Order management
- Review management
- User management

The backend checks the JWT token and the user's role before allowing access to admin-only routes.

---

## Main API Routes

The main backend routes are:

```text
/api/v1/product
/api/v1/category
/api/cart
/api/order
/api/review
/api/user
```

### Product API

Used for:

- Viewing products
- Searching products
- Filtering products
- Pagination
- Sorting
- Creating products
- Updating products
- Deleting products

Example:

```text
GET /api/v1/product
```

### Category API

Used for retrieving product categories.

Example:

```text
GET /api/v1/category
```

Available categories include:

```text
Guitars
Keyboards
Audio Equipment
```

### Cart API

Used for:

- Retrieving a user's cart
- Adding products to cart
- Removing cart items

Example base route:

```text
/api/cart
```

Cart routes require authentication.

### Order API

Used for:

- Creating orders
- Retrieving customer orders
- Retrieving all orders for admins
- Updating order status

Example base route:

```text
/api/order
```

### Review API

Used for:

- Viewing product reviews
- Creating reviews
- Updating reviews

Example base route:

```text
/api/review
```

### User API

Used for:

- Registration
- Login
- Viewing profiles
- Updating profiles
- Managing users
- Updating user roles
- Activating accounts
- Deactivating accounts

Example base route:

```text
/api/user
```

---

## Order Status

Orders can have the following statuses:

```text
Ongoing
Confirmed
Ready for Claiming
Claimed
Cancelled
```

A newly created order starts as:

```text
Ongoing
```

An administrator can update the order to:

```text
Confirmed
```

and then:

```text
Ready for Claiming
```

---

## HTTP Status Codes

The backend uses standard HTTP status codes.

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

`401 Unauthorized` is returned when a valid authentication token is not provided.

`403 Forbidden` is returned when the user is authenticated but does not have permission to access the requested resource.

`400 Bad Request` is used for invalid submitted data.

`404 Not Found` is used when a requested resource does not exist.

`500 Internal Server Error` is used for unexpected server-side errors.

---

## Frontend Architecture

The frontend follows a component-based structure.

Reusable components are stored inside:

```text
src/components/
```

Examples:

```text
Button.jsx
NavBar.jsx
Footer.jsx
Sidebar.jsx
ProductCard.jsx
ProductList.jsx
```

Pages are stored inside:

```text
src/pages/
```

Examples:

```text
HomePage.jsx
AboutPage.jsx
ProductListPage.jsx
ProductPage.jsx
OrdersPage.jsx
ProfilePage.jsx
ManageUsersPage.jsx
SignInPage.jsx
SignUpPage.jsx
```

API request functions are stored inside:

```text
src/services/
```

Examples:

```text
UserService.js
ProductService.js
CategoryService.js
CartService.js
OrderService.js
ReviewService.js
```

This keeps API communication separate from the page components.

---

## Backend Architecture

The backend follows an MVC-inspired layered structure.

The general flow is:

```text
Frontend
   ↓
API Route
   ↓
Middleware
   ↓
Controller
   ↓
Mongoose Model
   ↓
MongoDB Atlas
```

### Routes

Routes define the backend API endpoints.

Located inside:

```text
arellano-server/routes/
```

### Middleware

Middleware handles authentication and authorization.

Located inside:

```text
arellano-server/middleware/
```

The authentication middleware verifies JWT tokens.

The authorization middleware checks whether the user has the required role.

### Controllers

Controllers contain the backend application logic.

Located inside:

```text
arellano-server/controllers/
```

Controllers receive requests, communicate with models, and return responses.

### Models

Models define the MongoDB schemas.

Located inside:

```text
arellano-server/models/
```

The system includes models such as:

```text
User
Product
Category
Cart
Order
Review
```

---

## Testing with Postman

Postman can be used to test the backend APIs.

For public routes, send the request normally.

Example:

```text
GET http://localhost:8000/api/v1/product
```

For protected routes:

1. Login using the login endpoint.
2. Copy the JWT token from the response.
3. Open the protected request.
4. Open the **Authorization** tab.
5. Select **Bearer Token**.
6. Paste the JWT token.
7. Send the request.

You may also manually use:

```text
Authorization: Bearer <token>
```

inside the request headers.

---

## Common Setup Problems

### MongoDB Authentication Failed

If the backend shows:

```text
authentication failed
```

check:

- MongoDB username
- MongoDB password
- MongoDB connection string
- Database Access configuration
- Network Access configuration

Restart the backend after changing `.env`.

### MONGO_URI is Undefined

If the server shows:

```text
The uri parameter to openUri() must be a string, got undefined
```

make sure:

```text
arellano-server/.env
```

exists and contains:

```env
MONGO_URI=your_connection_string
```

Restart the backend afterward.

### Frontend Cannot Connect to Backend

Make sure the backend is running.

The backend terminal should display something similar to:

```text
Server running on port 8000
```

Also check that the frontend service files use the correct backend URL.

### Module Not Found

Run:

```bash
npm install
```

inside the folder where the error occurs.

For the frontend:

```bash
cd arellano-client
npm install
```

For the backend:

```bash
cd arellano-server
npm install
```

### Import Cannot Be Resolved

Check that the import path matches the actual file location.

Example:

```js
import Button from "../../components/Button.jsx";
```

Make sure the file exists at:

```text
src/components/Button.jsx
```

### Port Already in Use

Stop the running development server with:

```text
Ctrl + C
```

Then start it again.

---

## Quick Start

After the project has already been configured, use the following commands.

Backend:

```bash
cd arellano-server
npm install
npm run dev
```

Frontend:

```bash
cd arellano-client
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## Security Notes

Do not upload or publicly share:

- `.env`
- MongoDB username
- MongoDB password
- MongoDB connection string
- JWT secret key
- Private API keys

Sensitive values should always be stored using environment variables.

---

## Author

Developed as a full-stack Web Programming project using React, Node.js, Express.js, and MongoDB.