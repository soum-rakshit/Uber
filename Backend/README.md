# Uber Backend API Documentation

## User Registration Endpoint

### Endpoint: `POST /users/register`

#### Description

This endpoint allows new users to register for the Uber application. It validates the provided information, hashes the password using bcrypt, creates a new user record in the database, and returns a JWT authentication token along with the user details.

---

### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "fullname": {
        "firstname": "string",
        "lastname": "string"
    },
    "email": "string",
    "password": "string"
}
```

#### Required Fields

| Field                | Type   | Validation                                             | Description                      |
| -------------------- | ------ | ------------------------------------------------------ | -------------------------------- |
| `fullname.firstname` | String | Min 3 characters, required                             | User's first name                |
| `email`              | String | Valid email format, unique, min 5 characters, required | User's email address             |
| `password`           | String | Min 6 characters, required                             | User's password (will be hashed) |

#### Optional Fields

| Field               | Type   | Validation       | Description      |
| ------------------- | ------ | ---------------- | ---------------- |
| `fullname.lastname` | String | Min 3 characters | User's last name |

---

### Response

#### Success Response (Status Code: 200)

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john@example.com"
    }
}
```

**Details:**

- `token`: JWT authentication token (expires in 24 hours)
- `user`: User object containing the registered user's information

---

#### Error Responses

**Status Code: 400 - Bad Request (Validation Error)**

```json
{
    "errors": [
        {
            "msg": "Invalid email address",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "First name must be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        }
    ]
}
```

**Possible validation errors:**

- Invalid email address format
- First name must be at least 3 characters long
- Password must be at least 6 characters long
- Email already exists (unique constraint)
- Missing required fields

---

### Example Request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### Example Response

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGExYjJjM2Q0ZTVmNmc3aDhpOWowIiwiaWF0IjoxNzA5MDk2MDAwLCJleHAiOjE3MDkxODI0MDB9.abcdef123456",
    "user": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john@example.com"
    }
}
```

---

### Status Codes

| Status Code | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| `200`       | User successfully registered, token and user details returned |
| `400`       | Bad request - validation error or missing required fields     |
| `500`       | Server error - internal server error                          |

---

### Notes

- Passwords are automatically hashed using bcrypt (salt rounds: 10) before storing in the database
- The email field must be unique; registering with an existing email will fail
- The JWT token is valid for 24 hours
- The password field is not returned in the user object for security reasons

---

## User Login Endpoint

### Endpoint: `POST /users/login`

#### Description

This endpoint allows registered users to log in to the Uber application. It validates the provided email and password, verifies the credentials against the database, and returns a JWT authentication token along with the user details.

---

### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "email": "string",
    "password": "string"
}
```

#### Required Fields

| Field      | Type   | Validation                   | Description          |
| ---------- | ------ | ---------------------------- | -------------------- |
| `email`    | String | Valid email format, required | User's email address |
| `password` | String | Required                     | User's password      |

---

### Response

#### Success Response (Status Code: 200)

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john@example.com"
    }
}
```

**Details:**

- `token`: JWT authentication token (expires in 24 hours, also set as a cookie)
- `user`: User object containing the logged-in user's information

---

#### Error Responses

**Status Code: 400 - Bad Request (Validation Error)**

```json
{
    "errors": [
        {
            "msg": "Invalid email address",
            "param": "email",
            "location": "body"
        }
    ]
}
```

**Possible validation errors:**

- Invalid email address format
- Email is required
- Password is required

---

**Status Code: 401 - Unauthorized (Authentication Failed)**

```json
{
    "message": "Invalid email or password"
}
```

**Scenarios:**

- Email does not exist in the database
- Password does not match the stored hashed password

---

### Example Request

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### Example Response

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGExYjJjM2Q0ZTVmNmc3aDhpOWowIiwiaWF0IjoxNzA5MDk2MDAwLCJleHAiOjE3MDkxODI0MDB9.abcdef123456",
    "user": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john@example.com"
    }
}
```

---

### Status Codes

| Status Code | Description                                               |
| ----------- | --------------------------------------------------------- |
| `200`       | User successfully logged in, token and details returned   |
| `400`       | Bad request - validation error or missing required fields |
| `401`       | Unauthorized - invalid email or password                  |
| `500`       | Server error - internal server error                      |

---

### Notes

- The JWT token is valid for 24 hours
- The token is automatically set as a secure cookie for session management
- The password field is not returned in the user object for security reasons
- Both email and password must match exactly for authentication to succeed

---

## User Profile Endpoint

### Endpoint: `GET /users/profile`

#### Description

This endpoint retrieves the authenticated user's profile information. It requires a valid JWT token for authentication and returns the user's complete profile details.

---

### Authentication

This is a **protected endpoint** that requires authentication via JWT token. The token can be provided in two ways:

1. **Cookie**: `token` (automatically included in requests from the same domain)
2. **Authorization Header**: `Bearer <token>`

---

### Request Headers

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Or provide the token as a cookie with the request.

---

### Response

#### Success Response (Status Code: 200)

```json
{
    "_id": "64a1b2c3d4e5f6g7h8i9j0",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": "socket_id_string"
}
```

**Details:**

- `_id`: Unique identifier of the user
- `fullname`: Object containing user's first and last name
- `email`: User's email address
- `socketId`: Real-time socket connection ID (if applicable)

---

#### Error Responses

**Status Code: 401 - Unauthorized (Missing or Invalid Token)**

```json
{
    "message": "Unauthorized"
}
```

**Scenarios:**

- No token provided in request
- Token is invalid or malformed
- Token has expired

---

### Example Request

#### Using Authorization Header

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGExYjJjM2Q0ZTVmNmc3aDhpOWowIiwiaWF0IjoxNzA5MDk2MDAwLCJleHAiOjE3MDkxODI0MDB9.abcdef123456"
```

#### Using Cookie

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGExYjJjM2Q0ZTVmNmc3aDhpOWowIiwiaWF0IjoxNzA5MDk2MDAwLCJleHAiOjE3MDkxODI0MDB9.abcdef123456"
```

### Example Response

```json
{
    "_id": "64a1b2c3d4e5f6g7h8i9j0",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
}
```

---

### Status Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| `200`       | User profile retrieved successfully     |
| `401`       | Unauthorized - missing or invalid token |
| `500`       | Server error - internal server error    |

---

### Notes

- This endpoint requires valid authentication
- The password field is never returned for security reasons
- The user object is fetched from the database based on the JWT token's user ID
- Token must not be blacklisted to access this endpoint

---

## User Logout Endpoint

### Endpoint: `GET /users/logout`

#### Description

This endpoint logs out an authenticated user by blacklisting their current token and clearing the authentication cookie. After logout, the token cannot be used for further requests.

---

### Authentication

This is a **protected endpoint** that requires authentication via JWT token. The token can be provided in two ways:

1. **Cookie**: `token` (automatically included in requests from the same domain)
2. **Authorization Header**: `Bearer <token>`

---

### Request Headers

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Or provide the token as a cookie with the request.

---

### Response

#### Success Response (Status Code: 200)

```json
{
    "message": "Logged out successfully"
}
```

**Details:**

- The user's current token is added to the blacklist
- The `token` cookie is cleared from the client
- The user must log in again to access protected endpoints

---

#### Error Responses

**Status Code: 401 - Unauthorized (Missing or Invalid Token)**

```json
{
    "message": "Unauthorized"
}
```

**Scenarios:**

- No token provided in request
- Token is invalid or malformed
- Token has already been blacklisted

---

### Example Request

#### Using Authorization Header

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGExYjJjM2Q0ZTVmNmc3aDhpOWowIiwiaWF0IjoxNzA5MDk2MDAwLCJleHAiOjE3MDkxODI0MDB9.abcdef123456"
```

#### Using Cookie

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGExYjJjM2Q0ZTVmNmc3aDhpOWowIiwiaWF0IjoxNzA5MDk2MDAwLCJleHAiOjE3MDkxODI0MDB9.abcdef123456"
```

### Example Response

```json
{
    "message": "Logged out successfully"
}
```

---

### Status Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| `200`       | User successfully logged out            |
| `401`       | Unauthorized - missing or invalid token |
| `500`       | Server error - internal server error    |

---

### Notes

- This endpoint requires valid authentication
- The logout token is stored in the blacklist collection with a 24-hour TTL (Time To Live)
- After 24 hours, the blacklist entry is automatically deleted from the database
- Users cannot use their old token after logout, even if the token itself hasn't expired
- The token cookie is cleared from the client-side upon successful logout
- Attempting to use a blacklisted token on any protected endpoint will result in a 401 Unauthorized error
