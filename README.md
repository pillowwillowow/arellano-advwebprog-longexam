## Server-Client Integration

The project uses a client-server architecture where the React frontend communicates with the Express backend through REST API requests. The frontend is responsible for displaying the interface and handling user interactions, while the backend handles the application logic, authentication, authorization, and database operations.

To connect the client and server, the project uses the built-in JavaScript Fetch API. Instead of placing API requests directly inside every page, the requests are organized into separate service files such as `UserService.js`, `ProductService.js`, `CategoryService.js`, `CartService.js`, `OrderService.js`, and `ReviewService.js`. These service files send requests to the corresponding Express API routes and return the response back to the React pages.

For example, when the Products page loads, the frontend calls a function from `ProductService.js`. The service sends a request to the product API endpoint, the backend processes it through the product route and controller, and the Product model retrieves the required records from MongoDB. The result is then returned to the frontend as JSON and displayed on the page.

The project also uses JWT authentication for protected requests. After a successful login, the backend generates a JSON Web Token that contains the user's ID and role. The frontend stores this token and sends it in the `Authorization` header when accessing protected API endpoints. The backend verifies the token before allowing the request to continue. Role-based authorization is also applied so that customers and administrators have different levels of access. For example, an administrator can access user management and update order statuses, while a customer can access their own profile, cart, orders, and reviews.

The general flow of the project is:

`React Page → Service File → Fetch API → Express Route → Middleware → Controller → Mongoose Model → MongoDB`

This setup allows the frontend and backend to remain separated while still working together as one full-stack application.


## Libraries and Packages Used

The frontend uses React as the main library for building the user interface. React components are used to separate the interface into reusable parts, while hooks such as `useState` and `useEffect` are used to manage form values, page data, and API requests. React Router DOM is used for navigation between pages and for protected routes based on the user's login status and role.

Vite is used as the development and build tool for the React application. Tailwind CSS is used for styling the interface, including layouts, forms, buttons, cards, responsive design, spacing, and colors. Lucide React is used to provide icons throughout the interface, such as icons for users, products, orders, shopping carts, profiles, and password visibility.

The project does not use Axios. Instead, it uses the browser's built-in Fetch API to send GET, POST, PUT, and DELETE requests from the client to the backend.

On the backend, Node.js is used as the runtime environment, while Express is used to create the REST API routes. Mongoose is used to define the database schemas and communicate with MongoDB Atlas. The project uses `bcryptjs` to hash passwords before storing them in the database and to compare passwords during login. `jsonwebtoken` is used to generate and verify JWT tokens for authentication. The `cors` package allows the frontend and backend to communicate while running on different ports, while `dotenv` is used to store environment values such as the MongoDB connection string, secret key, and server port. `nodemon` is used during development so that the backend automatically restarts whenever changes are made.


## Design Pattern

The client side follows a component-based design with a service layer. The pages represent the main screens of the application, while reusable interface elements are placed inside the `components` folder. Common page structures are placed inside the `layouts` folder. API requests are separated into the `services` folder so that the React pages do not need to directly contain all of the Fetch request logic.

This design makes the frontend easier to maintain because each part has a specific responsibility. For example, `ProductPage.jsx` is responsible for displaying product details and handling user interaction, while `ProductService.js` is responsible for communicating with the product API.

The server side follows an MVC-inspired layered architecture. The `routes` folder contains the API endpoints, the `controllers` folder contains the application logic, and the `models` folder contains the Mongoose schemas used to communicate with MongoDB. The `middleware` folder contains functions for authentication and authorization, such as verifying JWT tokens and checking user roles.

The backend flow can be represented as:

`Route → Middleware → Controller → Model → MongoDB`

This structure separates the different responsibilities of the server and makes the backend easier to organize and maintain.


## Project File Structure

```text
arellano-webprog/
│
├── arellano-client/
│   └── src/
│       ├── components/
│       │   ├── Button.jsx
│       │   ├── Footer.jsx
│       │   ├── NavBar.jsx
│       │   ├── ProductCard.jsx
│       │   └── ProductList.jsx
│       │
│       ├── layouts/
│       │   ├── AuthLayout.jsx
│       │   └── Layout.jsx
│       │
│       ├── pages/
│       │   ├── AuthPages/
│       │   │   ├── SignInPage.jsx
│       │   │   └── SignUpPage.jsx
│       │   │
│       │   ├── LandingPages/
│       │   │   ├── HomePage.jsx
│       │   │   ├── AboutPage.jsx
│       │   │   ├── ProductListPage.jsx
│       │   │   ├── ProductPage.jsx
│       │   │   ├── OrdersPage.jsx
│       │   │   ├── ProfilePage.jsx
│       │   │   └── ManageUsersPage.jsx
│       │   │
│       │   └── NotFoundPage.jsx
│       │
│       ├── services/
│       │   ├── UserService.js
│       │   ├── ProductService.js
│       │   ├── CategoryService.js
│       │   ├── CartService.js
│       │   ├── OrderService.js
│       │   └── ReviewService.js
│       │
│       ├── App.jsx
│       └── main.jsx
│
└── arellano-server/
    ├── config/
    ├── controllers/
    │   ├── userController.js
    │   ├── productController.js
    │   ├── categoryController.js
    │   ├── cartController.js
    │   ├── orderController.js
    │   └── reviewController.js
    │
    ├── middleware/
    │   └── authMiddleware.js
    │
    ├── models/
    │   ├── userModel.js
    │   ├── productModel.js
    │   ├── categoryModel.js
    │   ├── cartModel.js
    │   ├── orderModel.js
    │   └── reviewModel.js
    │
    ├── routes/
    │   ├── userRoutes.js
    │   ├── productRoutes.js
    │   ├── categoryRoutes.js
    │   ├── cartRoutes.js
    │   ├── orderRoutes.js
    │   └── reviewRoutes.js
    │
    ├── .env
    ├── index.js
    └── package.json