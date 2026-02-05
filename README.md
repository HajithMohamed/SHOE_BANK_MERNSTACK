<h1 align="center">👟 Shoe Bank – E-Commerce + Inventory Management System</h1>

<p align="center">
  <b>Revolutionizing Shoe Retail in Sri Lanka 🇱🇰</b><br>
  Wholesale ➜ Retail ➜ Online ➜ AI-Driven<br>
  Built with the <b>MERN Stack (MongoDB, Express.js, React, Node.js)</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
</p>

---

## 📋 Table of Contents
- [About the Project](#-about-shoe-bank)
- [Key Features](#-key-features)
- [Technology Stack](#️-technology-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Database Models](#-database-models)
- [Environment Variables](#-environment-variables)
- [Docker Deployment](#-docker-deployment)
- [Security Features](#-security-features)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

---

## 🏪 About Shoe Bank

**Shoe Bank** is a comprehensive **E-Commerce and Inventory Management System** designed for a wholesale shoe business based in **Kattankudy, Sri Lanka**. The platform handles both B2B (Business-to-Business) and B2C (Business-to-Consumer) operations, selling imported footwear from India including brands like Walkaro, VKS, Nexo, Leeds, and Mark.

### Business Model
- **Wholesale Operations**: Manage bulk orders, customer accounts, and credit limits
- **Retail E-Commerce**: Online shopping platform for end consumers
- **Inventory Management**: Real-time stock tracking and product management
- **Customer Relationship Management**: Track customer history, credit balances, and payments

🌍 [Visit Official Website](https://shoebank.lk) *(Coming Soon)*  
🔗 [GitHub Repository](https://github.com/HajithMohamed/SHOE_BANK_MERNSTACK)

---

## 💡 Why This Project Matters

- 🛍 **Digital Transformation**: Modernize traditional wholesale business operations  
- 📊 **Inventory Control**: Real-time stock management and automated reordering  
- 🤝 **Customer Management**: Track B2B relationships, credit limits, and payment history  
- 💳 **Secure Payments**: Integrated payment solutions for online transactions  
- 📈 **Data Analytics**: Business insights through dashboard analytics  
- 🚚 **Order Management**: Streamlined order processing and tracking  
- 🇱🇰 **Local Market Focus**: Tailored for Sri Lankan business requirements

---

## ✨ Key Features

### 🛒 E-Commerce Features

#### Customer-Facing
- **Product Catalog**: Browse shoes by brand, category (Gents, Ladies, Kids, Boys, Girls), size, and color
- **Advanced Filtering**: Multi-criteria search with price ranges and availability
- **Product Details**: Comprehensive product information with multiple images
- **Deal Management**: Featured products, discounts, and promotional pricing
- **View Tracking**: Product popularity analytics through view counts
- **Responsive Design**: Mobile-first approach for seamless shopping experience

#### Shopping Experience
- Shopping cart functionality
- Wishlist management
- Order placement and tracking
- Secure checkout process
- Order history and status updates

### 📦 Inventory Management
- **Stock Control**: Real-time inventory tracking per product and size
- **Low Stock Alerts**: Automated notifications for reordering
- **Bulk Import/Export**: CSV/Excel integration for product data
- **Product Variants**: Manage multiple sizes and colors per product
- **Stock Adjustments**: Manual adjustments with audit trails
- **Supplier Management**: Track supplier information and order history

### 👥 Customer Management (B2B)
- **Customer Profiles**: Detailed business customer information
  - Shop name and location
  - Contact details (mobile, email, address)
  - Account numbers for tracking
- **Credit Management**: 
  - Set credit limits per customer
  - Track current balance and payment history
  - Block/unblock customers based on credit status
- **Customer Analytics**:
  - Top customers by order volume
  - Customer count and growth metrics
  - Purchase history and patterns
  - Search customers by name, shop, account number, mobile, email, or city

### 💰 Clearance Management
- Track clearance sales and special promotions
- Manage clearance customer accounts
- Monitor total payments and transaction history
- Active/inactive status management
- Audit trail with creator tracking

### 🔐 User Management & Authentication
- **Multi-Role System**:
  - **Admin**: Full system access and management
  - **Staff**: Limited access for daily operations
  - **Retail User**: Customer account for online shopping
- **Security Features**:
  - JWT-based authentication with httpOnly cookies
  - Email verification with OTP
  - Password reset functionality with OTP
  - Password change with OTP verification
  - Secure password hashing with bcrypt
  - Role-based access control (RBAC)

### 📊 Admin Dashboard
- Real-time business metrics and KPIs
- Sales analytics and trends
- Product performance tracking
- Customer analytics and insights
- Inventory status overview
- Order management interface

### 🖼️ Media Management
- **Cloudinary Integration**: Cloud-based image storage
- Multiple images per product (up to 5 images)
- Automatic image optimization
- Responsive image delivery
- Secure upload with file validation
- Image deletion and management

---

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20+ | Runtime environment |
| **Express.js** | ^4.19.2 | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | ^8.19.1 | MongoDB ODM |
| **JWT** | ^9.0.2 | Authentication tokens |
| **bcryptjs** | ^3.0.2 | Password hashing |
| **Cloudinary** | ^2.8.0 | Image management |
| **Multer** | ^2.0.2 | File upload handling |
| **Nodemailer** | ^7.0.12 | Email service |
| **Mailtrap** | ^4.4.0 | Email testing |
| **Validator** | ^13.15.20 | Data validation |
| **Cookie-Parser** | ^1.4.7 | Cookie parsing |
| **CORS** | ^2.8.5 | Cross-origin requests |
| **dotenv** | ^17.2.3 | Environment variables |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^19.2.0 | UI library |
| **React DOM** | ^19.2.0 | React rendering |
| **Vite** | ^7.2.4 | Build tool and dev server |
| **ESLint** | ^9.39.1 | Code linting |

### DevOps & Tools
- **Docker**: Containerization for both frontend and backend
- **Nodemon**: Development auto-reload
- **Git**: Version control
- **GitHub Actions**: CI/CD pipeline

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Admin Panel │  │   Web App    │  │  Mobile App  │          │
│  │   (React)    │  │   (React)    │  │   (Future)   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API GATEWAY   │
                    │   (Express.js)  │
                    │   Port: 5000    │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼────┐         ┌────▼────┐        ┌────▼────┐
    │  Auth   │         │Business │        │  Media  │
    │ Service │         │ Logic   │        │ Service │
    │  (JWT)  │         │ (CRUD)  │        │(Multer) │
    └────┬────┘         └────┬────┘        └────┬────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                    ┌────────▼────────┐
                    │    DATABASE     │
                    │   (MongoDB)     │
                    │    Models:      │
                    │  - User         │
                    │  - Product      │
                    │  - Customer     │
                    │  - Image        │
                    │  - Clearance    │
                    │  - Supplier     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  CLOUD STORAGE  │
                    │  (Cloudinary)   │
                    └─────────────────┘
```

### Request Flow
1. **Client Request** → React App sends HTTP request
2. **CORS Validation** → Express checks origin (localhost:5173)
3. **Authentication** → JWT token verified via cookies
4. **Authorization** → Role-based access control
5. **Business Logic** → Controller processes request
6. **Database** → Mongoose queries MongoDB
7. **Response** → JSON data returned to client

---

## 📁 Project Structure

```
SHOE_BANK_MERNSTACK/
├── Back-End/                           # Backend Node.js Application
│   ├── Config/
│   │   └── cloudinary-config.js        # Cloudinary SDK configuration
│   │
│   ├── Controller/                     # Business Logic Layer
│   │   ├── admin-dashboard-controller.js
│   │   ├── admin-image-controller.js
│   │   ├── admin-order-controller.js
│   │   ├── admin-product-controller.js
│   │   ├── admin-setting-controller.js
│   │   ├── admin-user-controller.js
│   │   ├── auth-controller.js          # Login, Register, OTP verification
│   │   ├── clearance-controller.js     # Clearance sales management
│   │   ├── customer-controller.js      # B2B customer CRUD + analytics
│   │   ├── errorController.js          # Global error handler
│   │   ├── home-controller.js          # Homepage featured products
│   │   ├── image-controller.js         # Product image operations
│   │   ├── product-controller.js       # Product CRUD + filtering
│   │   └── user-controller.js          # User profile management
│   │
│   ├── Data-Base/
│   │   └── db.js                       # MongoDB connection with Mongoose
│   │
│   ├── Helper/
│   │   └── cloudinary-helper.js        # Image upload/delete utilities
│   │
│   ├── Middlewares/                    # Express Middleware
│   │   ├── admin-middleware.js         # Admin-only route protection
│   │   ├── auth-middleware.js          # JWT token verification
│   │   ├── pagination-middleware.js    # Paginated results
│   │   ├── role-base-access-middleware.js  # RBAC authorization
│   │   └── upload-middleware.js        # Multer file upload config
│   │
│   ├── Models/                         # Mongoose Schemas
│   │   ├── Clearance.js                # Clearance customer model
│   │   ├── Customer.js                 # B2B customer model
│   │   ├── Image.js                    # Product images model
│   │   ├── Product.js                  # Product catalog model
│   │   ├── Supplier.js                 # Supplier information
│   │   └── Users.js                    # User authentication model
│   │
│   ├── routes/                         # API Route Definitions
│   │   ├── auth-routes.js              # POST /api/auth/register, login
│   │   ├── clearance-route.js          # CRUD /api/clearance
│   │   ├── customer-routes.js          # CRUD /api/customer
│   │   ├── home-routes.js              # GET /api/home
│   │   ├── image-routes.js             # POST /api/image/upload
│   │   ├── product-routes.js           # CRUD /api/product
│   │   └── user-routes.js              # GET /api/user/profile
│   │
│   ├── utils/                          # Utility Functions
│   │   ├── appError.js                 # Custom error class
│   │   ├── catchAsync.js               # Async error wrapper
│   │   ├── filter-object.js            # Object filtering for security
│   │   ├── generate-otp.js             # 6-digit OTP generator
│   │   └── send-mail.js                # Nodemailer email service
│   │
│   ├── Uploads/                        # Temporary file uploads (local)
│   ├── Dockerfile                      # Backend containerization
│   ├── package.json                    # Backend dependencies
│   └── server.js                       # Express app entry point
│
├── Front-End/                          # Frontend React Application
│   ├── Shoe-bank-frontend/
│   │   ├── src/
│   │   │   ├── assets/                 # Images, fonts, static files
│   │   │   ├── App.jsx                 # Root component
│   │   │   ├── App.css                 # Component styles
│   │   │   ├── main.jsx                # React DOM render
│   │   │   └── index.css               # Global styles
│   │   │
│   │   ├── public/                     # Public static assets
│   │   ├── eslint.config.js            # ESLint configuration
│   │   ├── vite.config.js              # Vite build config
│   │   ├── package.json                # Frontend dependencies
│   │   └── index.html                  # HTML entry point
│   │
│   └── Dockerfile                      # Frontend containerization
│
├── .github/
│   └── workflows/                      # CI/CD GitHub Actions
│
├── .git/                               # Git version control
└── README.md                           # Project documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager
- **Git**
- **Cloudinary Account** (for image storage)
- **Email Service** (Mailtrap for development, or SMTP for production)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/HajithMohamed/SHOE_BANK_MERNSTACK.git
cd SHOE_BANK_MERNSTACK
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd Back-End

# Install dependencies
npm install

# Create .env file (see Environment Variables section below)
# Add your MongoDB URI, JWT secret, Cloudinary credentials, etc.

# Start development server
npm run dev

# Or start production server
npm start
```

The backend will run on **http://localhost:5000**

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd Front-End/Shoe-bank-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend will run on **http://localhost:5173**

### 4️⃣ Verify Installation

1. Open **http://localhost:5173** in your browser
2. You should see the Shoe Bank homepage
3. Test backend API: **http://localhost:5000/api/home**

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### Verify Email OTP
```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

### Product Endpoints

#### Get All Products (Admin/User)
```http
GET /api/product/get-all-products?page=1&limit=10
Authorization: Bearer <JWT_TOKEN>
```

#### Add Product (Admin Only)
```http
POST /api/product/add-product
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

{
  "artNo": "WK-001",
  "brand": "Walkaro",
  "category": "Gents",
  "color": "Black",
  "price": 2500,
  "stock": 100,
  "sizes": [7, 8, 9, 10],
  "images": [<file1>, <file2>]
}
```

#### Update Product (Admin Only)
```http
PUT /api/product/update-product/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "price": 2800,
  "stock": 80
}
```

#### Delete Product (Admin Only)
```http
DELETE /api/product/delete-product/:id
Authorization: Bearer <JWT_TOKEN>
```

#### Filter Products
```http
GET /api/product/filter-search?brand=Walkaro&category=Gents&minPrice=1000&maxPrice=5000
Authorization: Bearer <JWT_TOKEN>
```

### Customer Endpoints

#### Add Customer (Admin Only)
```http
POST /api/customer
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "John Doe",
  "shopName": "ABC Footwear",
  "shopLocatedAt": "Colombo",
  "mobileNo": "+94771234567",
  "address": "123 Main Street, Colombo",
  "email": "john@abcfootwear.com",
  "accountNo": 12345,
  "creditLimit": 100000
}
```

#### Get All Customers (Admin Only)
```http
GET /api/customer?page=1&limit=10&name=John
Authorization: Bearer <JWT_TOKEN>
```

#### Get Customer Count
```http
GET /api/customer/count
Authorization: Bearer <JWT_TOKEN>
```

#### Get Top Customers
```http
GET /api/customer/top
Authorization: Bearer <JWT_TOKEN>
```

### Image Endpoints

#### Upload Images
```http
POST /api/image/upload
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

{
  "productId": "<product_id>",
  "images": [<file1>, <file2>, <file3>]
}
```

### Clearance Endpoints

#### Add Clearance Customer
```http
POST /api/clearance
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Jane Smith",
  "mobileNo": "+94779876543",
  "address": "456 Market Road",
  "accountNo": "CL-001",
  "totalPaid": 50000
}
```

#### Get All Clearance Customers
```http
GET /api/clearance
Authorization: Bearer <JWT_TOKEN>
```

### Home Endpoints

#### Get Homepage Data
```http
GET /api/home
```

Returns featured products, deals, and promotional content.

---

## 🗄️ Database Models

### Product Model
```javascript
{
  artNo: String,              // Article number (unique identifier)
  brand: String,              // Brand name (Walkaro, VKS, etc.)
  category: String,           // Enum: ["Gents", "Ladies", "Kids", "Boys", "Girls"]
  color: String,              // Product color
  price: Number,              // Base price
  discountPercent: Number,    // Discount percentage (0-100)
  discountPrice: Number,      // Calculated discount price
  isFeatured: Boolean,        // Show on homepage
  isOnDeal: Boolean,          // Active deal flag
  soldCount: Number,          // Total units sold
  views: Number,              // Product view count
  sizes: [Number],            // Available sizes (e.g., [7, 8, 9, 10])
  stock: Number,              // Total stock quantity
  createdAt: Date,
  updatedAt: Date
}
```

### Customer Model (B2B)
```javascript
{
  userId: ObjectId,           // Optional linked user account
  name: String,               // Customer name
  shopName: String,           // Shop name (unique)
  shopLocatedAt: String,      // Shop location
  mobileNo: String,           // Phone number
  address: String,            // Full address
  email: String,              // Email address
  accountNo: Number,          // Account number
  creditLimit: Number,        // Maximum credit allowed
  currentBalance: Number,     // Current outstanding balance
  isBlocked: Boolean,         // Block status
  createdBy: ObjectId,        // Admin who created
  createdAt: Date,
  updatedAt: Date
}
```

### User Model
```javascript
{
  email: String,              // Unique email
  password: String,           // Hashed password (bcrypt)
  role: String,               // Enum: ["admin", "staff", "retail_user"]
  isVerified: Boolean,        // Email verification status
  isActive: Boolean,          // Account active status
  otp: String,                // Email verification OTP
  otpExpires: Date,           // OTP expiration time
  resetPasswordOtp: String,   // Password reset OTP
  resetPasswordOtpExpires: Date,
  resetPasswordOtpVerified: Boolean,
  changePasswordOtp: String,  // Password change OTP
  changePasswordOtpExpires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Image Model
```javascript
{
  productId: ObjectId,        // Reference to Product
  publicId: String,           // Cloudinary public ID
  url: String,                // Image URL
  format: String,             // Image format (jpg, png, etc.)
  width: Number,              // Image width
  height: Number,             // Image height
  createdAt: Date
}
```

### Clearance Model
```javascript
{
  name: String,               // Customer name
  mobileNo: String,           // Phone number
  address: String,            // Address
  accountNo: String,          // Account number
  totalPaid: Number,          // Total amount paid
  isActive: Boolean,          // Active status
  createdBy: ObjectId,        // Admin who created
  createdAt: Date,
  updatedAt: Date
}
```

### Supplier Model
```javascript
{
  name: String,               // Supplier name
  contactPerson: String,      // Contact person name
  mobileNo: String,           // Phone number
  email: String,              // Email address
  address: String,            // Full address
  brands: [String],           // Brands supplied
  isActive: Boolean,          // Active status
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Environment Variables

Create a `.env` file in the `Back-End` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/shoebank
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shoebank

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration (Mailtrap for development)
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your-mailtrap-username
MAILTRAP_PASS=your-mailtrap-password

# OR Production SMTP
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# OTP Configuration
OTP_EXPIRES_IN=10
```

### Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/shoebank |
| `JWT_SECRET` | Secret key for JWT signing | random-string-min-32-chars |
| `JWT_EXPIRES_IN` | JWT token expiration | 7d (7 days) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name | my-cloud-name |
| `CLOUDINARY_API_KEY` | Cloudinary API key | 123456789012345 |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | abcdefghijklmnop |
| `MAILTRAP_HOST` | Email service host | sandbox.smtp.mailtrap.io |
| `MAILTRAP_USER` | Email service username | your-username |
| `OTP_EXPIRES_IN` | OTP expiration in minutes | 10 |

---

## 🐳 Docker Deployment

### Backend Docker

The backend includes a Dockerfile for containerization:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "run","dev"]
```

### Build and Run Backend Container

```bash
# Navigate to backend directory
cd Back-End

# Build Docker image
docker build -t shoebank-backend .

# Run container
docker run -p 5000:5000 --env-file .env shoebank-backend
```

### Frontend Docker (To be configured)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

### Docker Compose (Full Stack)

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: shoebank-mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=shoebank

  backend:
    build: ./Back-End
    container_name: shoebank-backend
    ports:
      - "5000:5000"
    env_file:
      - ./Back-End/.env
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/shoebank

  frontend:
    build: ./Front-End/Shoe-bank-frontend
    container_name: shoebank-frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  mongo-data:
```

Run with:
```bash
docker-compose up -d
```

---

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **HttpOnly Cookies**: Protect against XSS attacks
- **Password Hashing**: bcrypt with salt rounds
- **Role-Based Access Control**: Admin, Staff, Retail User roles
- **OTP Verification**: Email and password reset protection

### Data Security
- **Input Validation**: Validator.js for email, phone, etc.
- **Object Filtering**: Prevent mass assignment vulnerabilities
- **XSS Prevention**: Sanitize user inputs
- **CORS Configuration**: Whitelist trusted origins only

### API Security
- **Rate Limiting**: Prevent brute force attacks (to be implemented)
- **Helmet**: Security headers for Express
- **Request Size Limits**: Prevent payload overflow (10kb JSON limit)
- **File Upload Validation**: Restrict file types and sizes

### Best Practices
- Environment variables for sensitive data
- No credentials in source code
- Secure cookie settings
- HTTPS enforcement in production
- Regular security audits

---

## 🌐 Deployment Guide

### Backend Deployment (Render/Railway)

#### Render
1. Create account at [render.com](https://render.com)
2. New Web Service → Connect GitHub repo
3. Select `Back-End` directory
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables from `.env`

#### Railway
1. Create account at [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Add MongoDB database service
4. Configure environment variables
5. Deploy

### Frontend Deployment (Vercel/Netlify)

#### Vercel
```bash
cd Front-End/Shoe-bank-frontend
npm install -g vercel
vercel login
vercel
```

#### Netlify
```bash
cd Front-End/Shoe-bank-frontend
npm run build
# Drag and drop dist/ folder to netlify.com
```

### Database (MongoDB Atlas)
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create cluster (free tier available)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Update `MONGODB_URI` in backend

### Domain Configuration
- Purchase domain from [LK Domain Registry](https://www.nic.lk/)
- Configure DNS records:
  - `A` record → Backend IP
  - `CNAME` → Frontend domain
- Configure SSL certificates

---

## 🗺️ Roadmap

### ✅ Phase 1 – Foundation (Completed)
- [x] Project setup and structure
- [x] MongoDB models and relationships
- [x] Authentication system with JWT
- [x] User roles and permissions
- [x] Email OTP verification

### ✅ Phase 2 – Core Features (Completed)
- [x] Product CRUD operations
- [x] Multi-image upload with Cloudinary
- [x] Customer management system
- [x] Clearance sales tracking
- [x] Advanced filtering and search
- [x] Pagination middleware

### 🔄 Phase 3 – E-Commerce (In Progress)
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Order management
- [ ] Payment gateway integration (PayHere.lk)
- [ ] Order tracking system
- [ ] Email notifications

### 📋 Phase 4 – Admin Dashboard
- [ ] Analytics dashboard UI
- [ ] Sales reports and charts
- [ ] Inventory management interface
- [ ] Customer analytics
- [ ] Low stock alerts
- [ ] Bulk operations

### 🤖 Phase 5 – AI Integration
- [ ] Product recommendations
- [ ] Intelligent search
- [ ] Chatbot for customer support
- [ ] Demand prediction
- [ ] Visual search (image-based)

### 🚀 Phase 6 – Optimization & Deployment
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Mobile responsiveness
- [ ] PWA features
- [ ] Production deployment
- [ ] Monitoring and logging

### 🌟 Future Enhancements
- [ ] Multi-language support (Tamil, Sinhala)
- [ ] Mobile app (React Native)
- [ ] SMS notifications
- [ ] Loyalty program
- [ ] Referral system
- [ ] Social media integration
- [ ] Advanced analytics
- [ ] Automated reordering

---

## 📊 Business Growth Features

### Marketing & Promotions
- Email marketing campaigns
- SMS promotions
- Push notifications for offers
- Seasonal coupon codes
- Flash sales and deals

### Customer Engagement
- Customer loyalty points
- Referral rewards system
- Product reviews and ratings
- Wishlist functionality
- Social sharing

### Analytics & Insights
- Sales performance tracking
- Customer behavior analysis
- Product popularity metrics
- Revenue forecasting
- Inventory optimization

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting

### Bug Reports
- Use GitHub Issues
- Provide detailed description
- Include steps to reproduce
- Attach screenshots if applicable
- Specify environment details

---

## 👨‍💻 Developer Information

**Project Owner**: Shoe Bank (Kattankudy, Sri Lanka)  
**Lead Developer**: Mohamed Hajith  
**GitHub**: [HajithMohamed](https://github.com/HajithMohamed)  
**Repository**: [SHOE_BANK_MERNSTACK](https://github.com/HajithMohamed/SHOE_BANK_MERNSTACK)

### Team Structure
- **Backend Development**: Node.js, Express, MongoDB
- **Frontend Development**: React, Vite
- **DevOps**: Docker, CI/CD
- **Business Analysis**: Requirements gathering and feature planning

---

## 📝 License

This project is private and proprietary to Shoe Bank. All rights reserved.

---

## 📞 Support & Contact

For questions, issues, or business inquiries:

- 📧 **Email**: [Your business email]
- 🌐 **Website**: https://shoebank.lk (Coming Soon)
- 🏪 **Location**: Kattankudy, Sri Lanka
- 📱 **Phone**: [Your contact number]

---

## 🙏 Acknowledgments

- MongoDB for excellent database documentation
- Cloudinary for image management services
- Express.js community for middleware packages
- React team for the amazing UI library
- All contributors and supporters

---

<p align="center">
  Made with ❤️ in Sri Lanka 🇱🇰<br>
  <b>Shoe Bank – Walking Towards Digital Future</b>
</p>

---

## 📸 Screenshots

*Coming Soon - Screenshots of the application interface*

---

## 🔗 Quick Links

- [Installation Guide](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Database Models](#-database-models)
- [Deployment Guide](#-deployment-guide)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

---

**Last Updated**: February 2026  
**Version**: 1.0.0
