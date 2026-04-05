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

| Field      | Type   | Validation                     | Description          |
| ---------- | ------ | ------------------------------ | -------------------- |
| `email`    | String | Valid email format, required   | User's email address |
| `password` | String | Required                       | User's password      |

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

| Status Code | Description                                            |
| ----------- | ------------------------------------------------------ |
| `200`       | User successfully logged in, token and details returned |
| `400`       | Bad request - validation error or missing required fields |
| `401`       | Unauthorized - invalid email or password               |
| `500`       | Server error - internal server error                   |

---

### Notes

- The JWT token is valid for 24 hours
- The token is automatically set as a secure cookie for session management
- The password field is not returned in the user object for security reasons
- Both email and password must match exactly for authentication to succeed
