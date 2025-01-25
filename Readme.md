Scelloo Backend Assessment: Mini E-Commerce Product API

Objective

This project is a RESTful API for managing products in an e-commerce store, with features such as CRUD operations, pagination, filtering, searching, sorting, and basic authentication.

Technical Stack
Backend: Node.js, Express
Database: PostgreSQL with Sequelize ORM
Validation: Zod
Authentication: JWT (JSON Web Token)
Documentation: Swagger (OpenAPI)
Security: Express Rate Limiter, dotenv for environment variables
API Versioning: Versioned endpoints (/api/v1/).

Installation & Setup
1.	Clone the Repository:
    - git clone <repository-url>
2. Install dependencies 
    - npm install
3. Configure Environment Variables:
    PORT= your server port
    DB_HOST= localhost
    DB_PORT= your db port
    DB_USER= your_db_user
    DB_PASSWORD= your_db_password
    DB_NAME= your_db_name
    JWT_SECRET= your_secret_key
4. Initialize Database:
    - npm run sequelize:migrate
5. Start the server 
    - npm run dev
The server will start on http://localhost:PORT.
6. Access the API documentation at 
    - http://localhost:PORT/api-docs

API Endpoints:
Note: All endpoints require a valid JWT token, except for user registration and login.

Products
	•	GET /api/v1/products
List all products with pagination, filtering, searching, and sorting.
	•	GET /api/v1/products/:id
Retrieve product details by ID.
	•	POST /api/v1/products/create
Create a new product.
	•	PUT /api/v1/products/:id
Update an existing product.
	•	DELETE /api/v1/products/:id
Delete a product.

Users / Authentication
	•	POST /api/v1/users/create
Register a new user.
	•	POST /api/v1/users/login
Login and obtain a JWT.
	•	GET /api/v1/users
Fetch all users with pagination, search, filtering, and sorting options.
	•	GET /api/v1/users/:id
Fetch a user by their ID.
	•	PUT /api/v1/users/:id
Update a user by their ID.
	•	DELETE /api/v1/users/:id
Delete a user by their ID.