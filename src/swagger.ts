import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Scelloo Backend Assessment - E-Commerce API',
        version: '1.0.0',
        description: `This is a RESTful API for managing products in an e-commerce store. It includes features like product CRUD operations, pagination, search, filtering, sorting, authentication, and more.`,
    },
    servers: [
        {
            url: 'http://localhost:4003',
            description: 'Development server',
        },
    ],
    paths: {
        '/api/v1/users/create': {
            post: {
                tags: ['Users'],
                summary: 'Create a new user',
                description: 'Create a new user in the system',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UserCreate',
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'User created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid request body',
                    },
                },
            },
        },
        '/api/v1/users': {
            get: {
                tags: ['Users'],
                summary: 'Get all users',
                description: 'Fetch all users with pagination, search, filtering, and sorting options',
                parameters: [
                    {
                        name: 'page',
                        in: 'query',
                        description: 'Page number',
                        required: false,
                        schema: {
                            type: 'integer',
                            default: 1,
                        },
                    },
                    {
                        name: 'pageSize',
                        in: 'query',
                        description: 'Number of items per page',
                        required: false,
                        schema: {
                            type: 'integer',
                            default: 10,
                        },
                    },
                    {
                        name: 'search',
                        in: 'query',
                        description: 'Search string',
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    },
                    {
                        name: 'role',
                        in: 'query',
                        description: 'User role',
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    },
                    {
                        name: 'sortBy',
                        in: 'query',
                        description: 'Field to sort by',
                        required: false,
                        schema: {
                            type: 'string',
                            default: 'createdAt',
                        },
                    },
                    {
                        name: 'sortOrder',
                        in: 'query',
                        description: 'Sort order',
                        required: false,
                        schema: {
                            type: 'string',
                            enum: ['ASC', 'DESC'],
                            default: 'DESC',
                        },
                    },
                ],
                security: {
                    JWTAuth: []
                },
                responses: {
                    200: {
                        description: 'Users fetched successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/User' },
                                        },
                                        totalCount: { type: 'integer' },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
        },
        '/api/v1/users/{id}': {
            get: {
                tags: ['Users'],
                summary: 'Get a user by ID',
                description: 'Fetch a user by their ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'User ID',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                security: {
                    JWTAuth: []
                },
                responses: {
                    200: {
                        description: 'User fetched successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized',
                    },
                    404: {
                        description: 'User not found',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
            put: {
                tags: ['Users'],
                summary: 'Update a user by ID',
                description: 'Update a user by their ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'User ID',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UserUpdate',
                            },
                        },
                    },
                },
                security: {
                    JWTAuth: []
                },
            },
            delete: {
                tags: ['Users'],
                summary: 'Delete a user by ID',
                description: 'Delete a user by their ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'User ID',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                security: {
                    JWTAuth: []
                },
                responses: {
                    204: {
                        description: 'User deleted successfully',
                    },
                    401: {
                        description: 'Unauthorized',
                    },
                    404: {
                        description: 'User not found',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
        },
        '/api/v1/products': {
            get: {
                tags: ['Products'],
                summary: 'Get all products',
                description: 'Fetch all products with pagination, search, filtering, and sorting options',
                parameters: [
                    {
                        name: 'page',
                        in: 'query',
                        description: 'Page number',
                        required: false,
                        schema: {
                            type: 'integer',
                            default: 1,
                        },
                    },
                    {
                        name: 'pageSize',
                        in: 'query',
                        description: 'Number of items per page',
                        required: false,
                        schema: {
                            type: 'integer',
                            default: 10,
                        },
                    },
                    {
                        name: 'search',
                        in: 'query',
                        description: 'Search string',
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    },
                    {
                        name: 'category',
                        in: 'query',
                        description: 'Product category',
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    },
                    {
                        name: 'minPrice',
                        in: 'query',
                        description: 'Minimum price',
                        required: false,
                        schema: {
                            type: 'number',
                        },
                    },
                    {
                        name: 'maxPrice',
                        in: 'query',
                        description: 'Maximum price',
                        required: false,
                        schema: {
                            type: 'number',
                        },
                    },
                    {
                        name: 'sortBy',
                        in: 'query',
                        description: 'Field to sort by',
                        required: false,
                        schema: {
                            type: 'string',
                            default: 'createdAt',
                        },
                    },
                    {
                        name: 'sortOrder',
                        in: 'query',
                        description: 'Sort order',
                        required: false,
                        schema: {
                            type: 'string',
                            enum: ['ASC', 'DESC'],
                            default: 'DESC',
                        },
                    },
                    {
                        name: 'startDate',
                        in: 'query',
                        description: 'Start date for filtering',
                        required: false,
                        schema: {
                            type: 'string',
                            format: 'date-time',
                            example: '2022-01-01T00:00:00Z',
                        },
                    },
                    {
                        name: 'endDate',
                        in: 'query',
                        description: 'End date for filtering',
                        required: false,
                        schema: {
                            type: 'string',
                            format: 'date-time',
                            example: '2022-01-01T00:00:00Z',
                        },
                    },
                ],
                security: {
                    JWTAuth: []
                },
                requestBody: {
                    required: false,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    search: { type:'string' },
                                    category: { type:'string' },
                                    minPrice: { type: 'number' },
                                    maxPrice: { type: 'number' },
                                    sortBy: { type:'string' },
                                    sortOrder: { type:'string' },
                                    startDate: { type:'string', format: 'date-time' },
                                    endDate: { type:'string', format: 'date-time' },
                                },
                                required: [],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Products fetched successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/Product' },
                                        },
                                        totalCount: { type: 'integer' },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                }
            }
        },
        '/api/v1/products/create': {
            post: {
                tags: ['Products'],
                summary: 'Create a product',
                description: 'Create a new product',
                security: {
                    JWTAuth: []
                },
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Product',
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Product created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Product',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Bad request',
                    },
                    401: {
                        description: 'Unauthorized',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
        },
        '/api/v1/products/{productId}': {
            get: {
                tags: ['Products'],
                summary: 'Get a single product',
                description: 'Fetch a single product by ID',
                parameters: [
                    {
                        name: 'productId',
                        in: 'path',
                        description: 'Product ID',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                security: {
                    JWTAuth: []
                },
                responses: {
                    200: {
                        description: 'Product fetched successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Product',
                                },
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized',
                    },
                    404: {
                        description: 'Product not found',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
            put: {
                tags: ['Products'],
                summary: 'Update a product',
                description: 'Update an existing product by ID',
                parameters: [
                    {
                        name: 'productId',
                        in: 'path',
                        description: 'Product ID',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                security: {
                    JWTAuth: []
                },
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ProductUpdate',
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Product updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Product',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Bad request',
                    },
                    401: {
                        description: 'Unauthorized',
                    },
                    404: {
                        description: 'Product not found',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
            delete: {
                tags: ['Products'],
                summary: 'Delete a product',
                description: 'Delete an existing product by ID',
                parameters: [
                    {
                        name: 'productId',
                        in: 'path',
                        description: 'Product ID',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                security: {
                    JWTAuth: []
                },
                responses: {
                    200: {
                        description: 'Product deleted successfully',
                    },
                    401: {
                        description: 'Unauthorized',
                    },
                    404: {
                        description: 'Product not found',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            }
        },
    },
    securityDefinitions: {
        JWTAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    components: {
        schemas: {
            Product: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'Laptop' },
                    price: { type: 'number', example: 999.99 },
                    description: { type: 'string', example: 'A high-end gaming laptop.' },
                    stockQuantity: { type: 'integer', example: 50 },
                    category: { type: 'string', example: 'Electronics' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
                required: ['name', 'price', 'description', 'stockQuantity', 'category'],
            },
            User: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', example: 'john.doe@example.com' },
                    password: { type: 'string', example: 'hashedpassword' },
                    role: { type: 'string', enum: ['user', 'admin'], example: 'admin' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
                required: ['name', 'email', 'password', 'role'],
            },
            UserCreate: {
                type: 'object',
                properties: {
                    name: { type:'string', example: 'John Doe' },
                    email: { type:'string', example: 'john.doe@example.com' },
                    password: { type:'string', example: 'password123' },
                },
                required: ['name', 'email', 'password'],
            },
            UserUpdate: {
                type: 'object',
                properties: {
                    name: { type:'string', example: 'John Doe', minLength: 3, description: 'The name of the user (optional, min 3 characters)' },
                    email: { type:'string', example: 'john.doe@example.com', format: 'email', description: 'The email of the user (optional, must be a valid email)' },
                    password: { type:'string', example: 'newpassword123', minLength: 6, description: 'The password of the user (optional, min 6 characters)' },
                    role: { type:'string', enum: ['user', 'admin'], example: 'admin', description: 'The role of the user (optional, can be either "user" or "admin")' },
                },
                optional: ['name', 'email', 'password', 'role'],
            }
        },
    },
    tags: [
        { name: 'Products', description: 'Product management' },
        { name: 'Users', description: 'User authentication and authorization' },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;