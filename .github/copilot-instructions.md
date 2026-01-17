# Copilot Instructions for Ecommerce Backend API

## Architecture Overview

This is a **Node.js Express e-commerce REST API** using MongoDB with the following structure:

- **Entry point**: [index.js](../index.js) - Configures Express app, middleware, and route mounting
- **Database**: MongoDB with Mongoose ODM (strict queries disabled for flexibility)
- **Authentication**: JWT tokens + refresh tokens stored in cookies/DB + role-based access (admin/user)

### Route Organization (Modular)
Each resource has its own route file in `/routes` → controller in `/controllers` → model in `/models`:
- `/api/user` → User auth & management (register, login, password reset)
- `/api/product` → Product CRUD + filtering/sorting
- `/api/category`, `/api/blog`, `/api/branch`, `/api/coupon` → Similar patterns

## Key Patterns & Conventions

### 1. **Error Handling & Async Operations**
- **Every controller uses `asyncHandler`** wrapper from `express-async-handler` - errors thrown in async functions are automatically caught and passed to error middleware
- Error middleware in [middlewares/errorNotfound.js](../middlewares/errorNotfound.js) catches all errors
- Example: Throw errors naturally: `throw new Error('User already exist')`

### 2. **Authentication & Authorization**
- **JWT tokens** issued on login via [config/jwtToken.js](../config/jwtToken.js)
- **Refresh tokens** stored in cookies and DB via [config/refreshToken.js](../config/refreshToken.js)
- **Middleware protection** in [middlewares/authMiddleware.js](../middlewares/authMiddleware.js):
  - `authMiddleware`: Verifies Bearer token in `Authorization` header, attaches `req.user`
  - `isAdmin`: Checks user role is 'admin' (used with authMiddleware)
- Example route protection:
  ```javascript
  router.put('/user-edit', authMiddleware.authMiddleware, userControler.singleUserUpdate)
  router.get('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, userControler.singleUser)
  ```

### 3. **Data Validation**
- **MongoDB ID validation** via [validatedIDmongoDB/validatedID.js](../validatedIDmongoDB/validatedID.js) - validates ObjectId before querying
- Called at start of controllers handling `:id` params: `validateIDMongo(id)`
- No schema validation framework; validation is minimal/manual

### 4. **User Model & Password Security**
- Pre-save hook in [models/userModel.js](../models/userModel.js) hashes passwords with bcrypt (salt rounds: 10)
- Instance method `isPasswordMatched()` compares entered password during login
- Instance method `createResetPassWorkToken()` generates crypto-based password reset tokens (5-min expiry)

### 5. **Product Filtering & Querying**
- Complex filtering in [controllers/productControler.js](../controllers/productControler.js):
  - Query parameters `?price[gte]=100&price[lte]=500` converted to MongoDB operators: `$gte`, `$lte`, etc.
  - Sorting via `?sort=price,-createdAt` (comma-separated, `-` for descending)
  - Field limiting via `?fields=title,price` (comma-separated)
  - Pagination via `?page=2&limit=10`
- Slugs generated via `slugify` library on product creation/update

### 6. **Image Upload**
- Cloudinary integration in [validatedIDmongoDB/cloudinary.js](../validatedIDmongoDB/cloudinary.js)
- Environment variables required: `CLOUD_NAME`, `API_KEY`, `API_SECRET`
- Used in product controllers to upload images; returns secure URL

### 7. **Database Connections & Environment**
- Mongoose connection setup in [config/connectDB.js](../config/connectDB.js)
- Environment variables loaded via `dotenv` - must have `.env` file with:
  - `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLOUD_NAME`, `API_KEY`, `API_SECRET`, etc.

## Development Workflow

### Start Server
```bash
npm start  # Runs: nodemon index.js (watches for changes, auto-restarts)
```

### Dependencies Overview
- **Express** (core framework)
- **Mongoose 7.5.3** (MongoDB ODM)
- **JWT & bcrypt** (auth & password hashing)
- **Multer** (file uploads)
- **Cloudinary** (image storage)
- **Nodemailer** (email for password reset)
- **Morgan** (request logging)
- **Sharp** (image resizing)
- **Slugify** (URL-friendly slugs)
- **Cookie-Parser** (refresh tokens in cookies)

### No Testing Framework
Project has no tests (`test: "echo \"Error: no test specified\"`). Manual testing required or implement Jest/Mocha if needed.

## When Adding Features

### New Resource (e.g., Orders)
1. Create model in `/models/orderModel.js` with Mongoose schema
2. Create controller in `/controllers/orderControler.js` with CRUD functions + `asyncHandler` wrapper
3. Create route in `/routes/orderRoute.js` with endpoint definitions and middleware
4. Mount route in [index.js](../index.js): `app.use('/api/order', orderRoute)`

### Adding Middleware
- Always use `asyncHandler` in controllers to ensure errors are caught
- For custom middleware, follow [authMiddleware.js](../middlewares/authMiddleware.js) pattern: next() to continue, throw for errors

### Validation & ID Checks
- Always validate MongoDB ObjectIds at controller start: `validateIDMongo(id)`
- Use try-catch or rely on asyncHandler for error propagation

## File Naming Conventions
- **Controllers**: `{resource}Controler.js` (note: spelled "Controler" not "Controller" - consistent with existing code)
- **Routes**: `{resource}Route.js`
- **Models**: `{resource}Model.js`
- **Middleware**: `{functionName}Middleware.js`
