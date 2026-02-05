# 🔌 Shoe Bank API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.shoebank.lk/api (Coming Soon)
```

## Authentication
Most endpoints require JWT authentication. Include the JWT token in cookies (automatically handled by browser) or Authorization header.

### Authorization Header (Alternative)
```http
Authorization: Bearer <your_jwt_token>
```

---

## 📑 Table of Contents
1. [Authentication](#authentication-endpoints)
2. [Products](#product-endpoints)
3. [Customers](#customer-endpoints)
4. [Clearance](#clearance-endpoints)
5. [Images](#image-endpoints)
6. [Users](#user-endpoints)
7. [Home](#home-endpoints)
8. [Error Responses](#error-responses)

---

## 🔐 Authentication Endpoints

### Register New User
Create a new user account.

```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User registered successfully. Please verify your email.",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "email": "user@example.com",
      "role": "retail_user",
      "isVerified": false,
      "isActive": true
    }
  }
}
```

---

### Verify Email
Verify email address using OTP sent to email.

```http
POST /api/auth/verify-email
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "email": "user@example.com",
      "isVerified": true
    }
  }
}
```

---

### Login
Authenticate user and receive JWT token in httpOnly cookie.

```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "email": "user@example.com",
      "role": "admin",
      "isVerified": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Request Password Reset
Request OTP for password reset.

```http
POST /api/auth/forgot-password
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

---

### Reset Password
Reset password using OTP.

```http
POST /api/auth/reset-password
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePassword123"
}
```

---

### Logout
Logout user and clear JWT cookie.

```http
POST /api/auth/logout
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 📦 Product Endpoints

### Add Product
Create a new product with images. **Admin only**.

```http
POST /api/product/add-product
Authorization: Required (Admin)
Content-Type: multipart/form-data
```

**Form Data:**
```
artNo: WK-001
brand: Walkaro
category: Gents
color: Black
price: 2500
stock: 100
sizes: [7, 8, 9, 10]
discountPercent: 10
isFeatured: true
isOnDeal: false
images: <file1> <file2> (max 5 images)
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "product": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "artNo": "WK-001",
      "brand": "Walkaro",
      "category": "Gents",
      "color": "Black",
      "price": 2500,
      "discountPercent": 10,
      "discountPrice": 2250,
      "stock": 100,
      "sizes": [7, 8, 9, 10],
      "isFeatured": true,
      "isOnDeal": false,
      "soldCount": 0,
      "views": 0,
      "createdAt": "2026-02-04T10:30:00.000Z"
    },
    "images": [
      {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
        "productId": "64a1b2c3d4e5f6g7h8i9j0k1",
        "url": "https://res.cloudinary.com/...",
        "publicId": "shoebank/products/abc123",
        "format": "jpg",
        "width": 1200,
        "height": 800
      }
    ]
  }
}
```

---

### Get All Products
Retrieve paginated list of products. **Admin/User access**.

```http
GET /api/product/get-all-products?page=1&limit=10
Authorization: Required
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "count": 10,
  "totalPages": 5,
  "currentPage": 1,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "artNo": "WK-001",
      "brand": "Walkaro",
      "category": "Gents",
      "color": "Black",
      "price": 2500,
      "discountPrice": 2250,
      "stock": 100,
      "sizes": [7, 8, 9, 10],
      "images": [
        {
          "url": "https://res.cloudinary.com/...",
          "publicId": "shoebank/products/abc123"
        }
      ]
    }
  ]
}
```

---

### Get Product by ID
Retrieve single product details with images. **Admin/User access**.

```http
GET /api/product/get-product-by-id/:id
Authorization: Required
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product found",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "artNo": "WK-001",
    "brand": "Walkaro",
    "category": "Gents",
    "color": "Black",
    "price": 2500,
    "discountPercent": 10,
    "discountPrice": 2250,
    "stock": 100,
    "sizes": [7, 8, 9, 10],
    "soldCount": 25,
    "views": 150,
    "images": [
      {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
        "url": "https://res.cloudinary.com/...",
        "publicId": "shoebank/products/abc123",
        "format": "jpg"
      }
    ]
  }
}
```

---

### Filter Products
Search and filter products by multiple criteria. **Admin/User access**.

```http
GET /api/product/filter-search?brand=Walkaro&category=Gents&minPrice=1000&maxPrice=5000&color=Black
Authorization: Required
```

**Query Parameters:**
- `brand` (optional): Filter by brand name
- `category` (optional): Filter by category (Gents, Ladies, Kids, Boys, Girls)
- `color` (optional): Filter by color
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `size` (optional): Filter by size availability
- `isFeatured` (optional): true/false
- `isOnDeal` (optional): true/false
- `inStock` (optional): true (only in-stock items)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Products filtered successfully",
  "count": 5,
  "data": [...]
}
```

---

### Update Product
Update product information. **Admin only**.

```http
PUT /api/product/update-product/:id
Authorization: Required (Admin)
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "price": 2800,
  "stock": 80,
  "color": "Brown",
  "sizes": [7, 8, 9, 10, 11],
  "discountPercent": 15,
  "isFeatured": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": { /* updated product */ }
}
```

---

### Delete Product
Delete a product and its images. **Admin only**.

```http
DELETE /api/product/delete-product/:id
Authorization: Required (Admin)
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 👥 Customer Endpoints

### Add Customer
Create a new B2B customer. **Admin only**.

```http
POST /api/customer
Authorization: Required (Admin)
Content-Type: application/json
```

**Request Body:**
```json
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

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Customer added successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "shopName": "abc footwear",
    "shopLocatedAt": "Colombo",
    "mobileNo": "+94771234567",
    "address": "123 Main Street, Colombo",
    "email": "john@abcfootwear.com",
    "accountNo": 12345,
    "creditLimit": 100000,
    "currentBalance": 0,
    "isBlocked": false,
    "createdBy": "64a1b2c3d4e5f6g7h8i9j0k0",
    "createdAt": "2026-02-04T10:30:00.000Z"
  }
}
```

---

### Get All Customers
Retrieve paginated and filtered customer list. **Admin only**.

```http
GET /api/customer?page=1&limit=10&name=John&city=Colombo
Authorization: Required (Admin)
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `name` (optional): Search by customer name
- `shopName` (optional): Search by shop name
- `accountNo` (optional): Search by account number
- `mobileNo` (optional): Search by mobile number
- `email` (optional): Search by email
- `city` (optional): Search by city in address

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Customers fetched successfully",
  "count": 10,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "shopName": "abc footwear",
      "mobileNo": "+94771234567",
      "email": "john@abcfootwear.com",
      "creditLimit": 100000,
      "currentBalance": 25000,
      "isBlocked": false
    }
  ]
}
```

---

### Get Single Customer
Retrieve specific customer details. **Admin only**.

```http
GET /api/customer/:id
Authorization: Required (Admin)
```

---

### Get Customer Count
Get total number of customers. **Admin only**.

```http
GET /api/customer/count
Authorization: Required (Admin)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalCustomers": 150,
    "activeCustomers": 145,
    "blockedCustomers": 5
  }
}
```

---

### Get Top Customers
Retrieve top customers by order volume/value. **Admin only**.

```http
GET /api/customer/top?limit=10
Authorization: Required (Admin)
```

---

### Update Customer
Update customer information. **Admin only**.

```http
PUT /api/customer/:id
Authorization: Required (Admin)
Content-Type: application/json
```

**Request Body:**
```json
{
  "creditLimit": 150000,
  "currentBalance": 30000,
  "isBlocked": false
}
```

---

### Delete Customer
Delete a customer. **Admin only**.

```http
DELETE /api/customer/:id
Authorization: Required (Admin)
```

---

## 💰 Clearance Endpoints

### Add Clearance Customer
Create a new clearance customer record. **Admin only**.

```http
POST /api/clearance
Authorization: Required (Admin)
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "mobileNo": "+94779876543",
  "address": "456 Market Road, Batticaloa",
  "accountNo": "CL-001",
  "totalPaid": 50000
}
```

---

### Get All Clearance Customers
Retrieve all clearance customers. **Admin only**.

```http
GET /api/clearance
Authorization: Required (Admin)
```

---

### Update Clearance Customer
Update clearance customer information. **Admin only**.

```http
PUT /api/clearance/:id
Authorization: Required (Admin)
```

---

### Delete Clearance Customer
Delete a clearance customer. **Admin only**.

```http
DELETE /api/clearance/:id
Authorization: Required (Admin)
```

---

## 🖼️ Image Endpoints

### Upload Images
Upload product images to Cloudinary. **Admin only**.

```http
POST /api/image/upload
Authorization: Required (Admin)
Content-Type: multipart/form-data
```

**Form Data:**
```
productId: 64a1b2c3d4e5f6g7h8i9j0k1
images: <file1> <file2> <file3>
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "productId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "url": "https://res.cloudinary.com/...",
      "publicId": "shoebank/products/abc123",
      "format": "jpg",
      "width": 1200,
      "height": 800
    }
  ]
}
```

---

### Get Product Images
Retrieve all images for a specific product.

```http
GET /api/image/product/:productId
Authorization: Required
```

---

### Delete Image
Delete a specific image. **Admin only**.

```http
DELETE /api/image/:imageId
Authorization: Required (Admin)
```

---

## 👤 User Endpoints

### Get User Profile
Retrieve current user's profile.

```http
GET /api/user/profile
Authorization: Required
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "email": "user@example.com",
    "role": "admin",
    "isVerified": true,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
```

---

### Update User Profile
Update user information.

```http
PUT /api/user/profile
Authorization: Required
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "newemail@example.com"
}
```

---

### Change Password
Change user password with OTP verification.

```http
POST /api/user/change-password
Authorization: Required
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword123",
  "otp": "123456"
}
```

---

## 🏠 Home Endpoints

### Get Homepage Data
Retrieve featured products, deals, and promotional content. **Public access**.

```http
GET /api/home
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "featuredProducts": [...],
    "dealsOfTheDay": [...],
    "newArrivals": [...],
    "popularProducts": [...]
  }
}
```

---

## ❌ Error Responses

### Error Response Format
All errors follow this structure:

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "statusCode": 400,
    "status": "fail",
    "isOperational": true
  }
}
```

### Common HTTP Status Codes

| Status Code | Meaning | Example |
|-------------|---------|---------|
| 200 | Success | Request completed successfully |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate entry (e.g., email exists) |
| 422 | Unprocessable Entity | Validation error |
| 500 | Server Error | Internal server error |

### Example Error Responses

#### 400 Bad Request
```json
{
  "success": false,
  "message": "Required fields are missing",
  "error": {
    "statusCode": 400,
    "status": "fail"
  }
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "message": "You are not logged in. Please log in to access this resource.",
  "error": {
    "statusCode": 401,
    "status": "fail"
  }
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "message": "You do not have permission to perform this action",
  "error": {
    "statusCode": 403,
    "status": "fail"
  }
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found",
  "error": {
    "statusCode": 404,
    "status": "fail"
  }
}
```

#### 409 Conflict
```json
{
  "success": false,
  "message": "A user with this email already exists",
  "error": {
    "statusCode": 409,
    "status": "fail"
  }
}
```

---

## 📊 Pagination

Endpoints that return multiple items support pagination:

**Query Parameters:**
- `page`: Page number (starts at 1)
- `limit`: Items per page

**Example:**
```http
GET /api/product/get-all-products?page=2&limit=20
```

**Response includes:**
```json
{
  "currentPage": 2,
  "totalPages": 10,
  "count": 20,
  "data": [...]
}
```

---

## 🔍 Search & Filter

Most list endpoints support filtering:

**Example:**
```http
GET /api/product/filter-search?brand=Walkaro&category=Gents&minPrice=1000&maxPrice=5000
```

**Supported Operations:**
- Exact match: `category=Gents`
- Range: `minPrice=1000&maxPrice=5000`
- Text search: `name=John` (case-insensitive, partial match)

---

## 🔒 Authentication Flow

1. **Register**: `POST /api/auth/register`
2. **Verify Email**: `POST /api/auth/verify-email` (with OTP)
3. **Login**: `POST /api/auth/login` (receive JWT in cookie)
4. **Access Protected Routes**: Include cookie automatically
5. **Logout**: `POST /api/auth/logout`

---

## 📝 Best Practices

1. **Always check HTTP status codes**
2. **Handle errors gracefully**
3. **Use HTTPS in production**
4. **Never expose JWT tokens in logs**
5. **Implement rate limiting on client side**
6. **Cache GET requests when appropriate**
7. **Validate data before sending**

---

## 🧪 Testing with Postman

1. Import collection from `postman/` directory (if available)
2. Set environment variables:
   - `BASE_URL`: http://localhost:5000/api
   - `JWT_TOKEN`: Your JWT token after login
3. Test authentication flow first
4. Use saved tokens for subsequent requests

---

## 📞 Support

For API issues or questions:
- GitHub Issues: https://github.com/HajithMohamed/SHOE_BANK_MERNSTACK/issues
- Email: [Your support email]

---

**Last Updated**: February 2026  
**API Version**: 1.0.0
