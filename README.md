## Server and Client Integration

The BulldogEx Shop uses a client-server architecture where the frontend and backend are developed separately but communicate through REST API requests. The client side is developed using React and Vite, while the server side is developed using Node.js and Express. The React application is responsible for displaying the user interface and handling user interactions, while the Express server handles application logic, authentication, authorization, validation, and communication with the MongoDB database.

The frontend communicates with the backend using the built-in JavaScript Fetch API. Instead of placing API requests directly inside every React page, the project uses separate service files such as `UserService.js`, `ProductService.js`, `CategoryService.js`, `CartService.js`, `OrderService.js`, and `ReviewService.js`. Each service is responsible for communicating with its corresponding REST API endpoint. For example, `ProductService.js` communicates with `/api/v1/product`, while `OrderService.js` communicates with `/api/order`. This allows the React pages to focus on displaying data and handling user interactions while the service files handle communication with the backend.

When a request is sent from the client, it is received by an Express route on the server. The route forwards the request to the appropriate controller, which performs the required application logic and accesses MongoDB using a Mongoose model. The result is then returned to the React application as a JSON response. The general communication flow of the project is `React Page → Service File → Fetch API → Express Route → Controller → Mongoose Model → MongoDB`. After the database operation is completed, the response is returned through the same layers until it is displayed by the React frontend.

The project also integrates JWT authentication between the client and server. When a user successfully logs in, the Express server generates a JSON Web Token containing the user's ID and role. The React application stores the token and user information in local storage. When the frontend accesses a protected API endpoint, the corresponding service retrieves the token and sends it to the backend through the `Authorization` header using the Bearer token format. The backend uses authentication middleware to verify the token before allowing the request to continue.

Role-based authorization is also implemented on protected server endpoints. The authentication middleware first checks whether the request contains a valid JWT, while role verification middleware determines whether the authenticated user has permission to access a particular resource. For example, customers may view products, manage their cart, create orders, submit reviews, and access their own profile, while administrator accounts can access protected administrative operations such as viewing all users, editing users, creating or updating products, managing customer orders, and editing reviews. A request without a token returns `401 Unauthorized`, while a valid user without the required role receives `403 Forbidden`. A properly authenticated and authorized request is allowed to continue to the controller.

During development, the React frontend and Express backend run independently. The frontend is started using Vite, while the backend runs through the Express server on port `8000`. CORS is used to allow communication between the client and server when they are running on different origins or ports. This setup demonstrates full-stack integration because information displayed and modified by the React frontend is processed by the Express backend and stored in MongoDB Atlas rather than relying only on static or mock data.


## Libraries and Packages Used

The client side uses React as the main library for developing the user interface. React allows the application to be divided into reusable components such as the navigation bar, footer, buttons, product cards, and product lists. React hooks such as `useState` are used to manage component data and form values, while `useEffect` is used to perform operations such as retrieving information from the backend when a page is loaded.

React Router DOM is used to manage navigation between the different pages of the application. It is also used to implement protected frontend routes. The `ProtectedRoute` logic checks whether a user has a stored authentication token and account information before allowing access to restricted pages. It also checks the role of the logged-in user so that customer and administrator pages can be separated.

Vite is used as the frontend development and build tool. It provides the development server used to run the React application and automatically updates the application when changes are made to the source files. Tailwind CSS is used to style the user interface, including page layouts, forms, buttons, cards, responsive grids, spacing, typography, colors, and status indicators. Lucide React is used to provide reusable icons throughout the interface, including icons for users, products, orders, shopping carts, account information, security, and password visibility.

The project does not use Axios for HTTP communication. Instead, it uses the browser's built-in Fetch API. Fetch is used inside the frontend service files to send GET, POST, PUT, and DELETE requests to the Express REST API. For protected requests, the JWT stored after login is included in the `Authorization` request header using the `Bearer` format.

The server side uses Node.js as the JavaScript runtime environment and Express as the backend framework. Express is used to create REST API endpoints for users, products, categories, carts, orders, and reviews. It is also used to register middleware and connect API routes to their corresponding controller functions.

Mongoose is used as the Object Data Modeling library between Express and MongoDB. The project uses Mongoose models to define the structure of users, products, categories, carts, orders, and reviews. Mongoose is also responsible for database querying, document creation and updates, validation, object references, and population of related records. MongoDB Atlas is used as the cloud database where application information is stored.

The `bcryptjs` package is used for password security. User passwords are hashed before being stored in MongoDB, while `bcrypt.compare()` is used during login to determine whether the password entered by the user matches the stored hash. The `jsonwebtoken` package is used to generate and verify JSON Web Tokens. JWT is used by the project for user authentication and for protecting backend endpoints.

The `cors` package allows requests between the React client and Express server when they are running on different ports during development. The `dotenv` package is used to load configuration values from the `.env` file, including the MongoDB connection string, JWT secret key, salt value, server port, and environment configuration. `nodemon` is used during backend development to automatically restart the Express server whenever backend source files are modified.


## Design Pattern

### Client-Side Design Pattern

The React frontend follows a component-based architecture combined with a service-layer pattern. The application is divided into pages, reusable components, layouts, and services. Pages represent the major screens of the application, such as the product list, product details, orders, profile, and user management pages. Components contain reusable user interface elements, while layouts provide common page structures such as the navigation bar and footer.

The service layer separates REST API communication from the user interface. Instead of writing Fetch API requests repeatedly inside each React page, the requests are grouped according to their purpose. For example, user requests are placed in `UserService.js`, product requests are placed in `ProductService.js`, and order requests are placed in `OrderService.js`. This separation makes the client easier to maintain because UI-related code and API-related code have different responsibilities.

The client also uses protected routing as part of its design. Public pages can be accessed without authentication, while account-related pages require a logged-in user. Role-based routing is used to prevent customer accounts from accessing administrator pages. This client-side protection improves the user experience, while the backend performs the actual security validation through JWT authentication and role authorization.


### Server-Side Design Pattern

The Express backend follows an MVC-inspired layered architecture composed primarily of Routes, Controllers, Models, and Middleware. It is considered MVC-inspired rather than a traditional MVC application because the backend does not render server-side views. The React application acts as the separate client interface.

Routes define the REST API endpoints of the application and determine which controller should process each request. Controllers contain the application logic, including retrieving data, creating records, updating records, validating information, and generating responses. Models define the MongoDB document structure using Mongoose schemas and are responsible for database operations.

Middleware provides an additional layer between the routes and controllers. The authentication middleware verifies the JWT supplied by the React client, while the authorization middleware checks whether the authenticated user's role is allowed to perform a particular operation. Because middleware is executed before the controller, unauthorized requests can be rejected before application or database logic is performed.

The main server-side flow can therefore be represented as `Request → Route → Authentication/Authorization Middleware → Controller → Model → MongoDB → Response`. Separating these responsibilities makes the backend more organized and allows authentication, application logic, and database operations to be maintained independently.


## Project File Structure

The following file outline shows how the client and server are organized and how the design patterns are represented in the project.

```text
arellano-webprog/
│
├── arellano-client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductList.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── pages/
│   │   │   │
│   │   │   ├── AuthPages/
│   │   │   │   ├── SignInPage.jsx
│   │   │   │   └── SignUpPage.jsx
│   │   │   │
│   │   │   ├── LandingPages/
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── AboutPage.jsx
│   │   │   │   ├── ProductListPage.jsx
│   │   │   │   ├── ProductPage.jsx
│   │   │   │   ├── OrdersPage.jsx
│   │   │   │   ├── ProfilePage.jsx
│   │   │   │   └── ManageUsersPage.jsx
│   │   │   │
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── UserService.js
│   │   │   ├── ProductService.js
│   │   │   ├── CategoryService.js
│   │   │   ├── CartService.js
│   │   │   ├── OrderService.js
│   │   │   └── ReviewService.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── arellano-server/
    │
    ├── config/
    │   ├── config.js
    │   └── db.js
    │
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