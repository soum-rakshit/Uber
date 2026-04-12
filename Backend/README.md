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

            ---

            ## Captain Registration Endpoint

            ### Endpoint: `POST /captain/register`

            #### Description

            This endpoint allows new captains (drivers) to register for the Uber application. It validates the provided information, hashes the password using bcrypt, creates a new captain record in the database, and returns a JWT authentication token along with the captain details.

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
                "password": "string",
                "vehicle": {
                    "color": "string",
                    "plate": "string",
                    "capacity": number,
                    "vehicleType": "car|motorcycle|auto"
                }
            }
            ```

            #### Required Fields

            | Field | Type | Validation | Description |
            | ----- | ---- | ---------- | ----------- |
            | `fullname.firstname` | String | Min 3 characters, required | Captain's first name |
            | `email` | String | Valid email format, unique, required | Captain's email address |
            | `password` | String | Min 6 characters, required | Account password (will be hashed) |
            | `vehicle.color` | String | Min 3 characters, required | Vehicle color |
            | `vehicle.plate` | String | Min 3 characters, required | Vehicle plate |
            | `vehicle.capacity` | Number | Min 1, required | Vehicle capacity |
            | `vehicle.vehicleType` | String | One of `car`,`motorcycle`,`auto`, required | Vehicle type |

            #### Optional Fields

            | Field | Type | Validation | Description |
            | ----- | ---- | ---------- | ----------- |
            | `fullname.lastname` | String | Min 3 characters | Captain's last name |

            ---

            ### Response

            #### Success Response (Status Code: 201)

            ```json
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "captain": {
                    "_id": "64a1b2c3d4e5f6g7h8i9j0",
                    "fullname": {
                        "firstname": "John",
                        "lastname": "Doe"
                    },
                    "email": "john.captain@example.com",
                    "vehicle": {
                        "color": "Blue",
                        "plate": "XYZ123",
                        "capacity": 4,
                        "vehicleType": "car"
                    },
                    "status": "inactive",
                    "socketId": null
                }
            }
            ```

            **Details:**

            - `token`: JWT authentication token (expires in 24 hours)
            - `captain`: Captain object containing the registered captain's information (password is omitted)

            ---

            #### Error Responses

            **Status Code: 400 - Bad Request (Validation Error)**

            ```json
            {
                "errors": [
                    {
                        "msg": "Invalid Email",
                        "param": "email",
                        "location": "body"
                    }
                ]
            }
            ```

            **Possible validation errors:**

            - Invalid email format
            - Missing or too-short `fullname.firstname`
            - Missing or too-short `password`
            - Invalid or missing vehicle fields

            ---

            ### Example Request

            ```bash
            curl -X POST http://localhost:3000/captain/register \
                -H "Content-Type: application/json" \
                -d '{
                    "fullname": { "firstname": "Salim", "lastname": "Khan" },
                    "email": "salim@example.com",
                    "password": "securePassword123",
                    "vehicle": { "color": "Blue", "plate": "XYZ123", "capacity": 4, "vehicleType": "car" }
                }'
            ```

            ### Example Response

            ```json
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "captain": {
                    "_id": "64a1b2c3d4e5f6g7h8i9j0",
                    "fullname": { "firstname": "Salim", "lastname": "Khan" },
                    "email": "salim@example.com",
                    "vehicle": { "color": "Blue", "plate": "XYZ123", "capacity": 4, "vehicleType": "car" },
                    "status": "inactive",
                    "socketId": null
                }
            }
            ```

            ---

            ## Captain Login Endpoint

            ### Endpoint: `POST /captain/login`

            #### Description

            Allows an existing captain to log in. On success, returns a JWT and sets the `token` cookie for session-based requests.

            ---

            ### Request Body

            ```json
            {
                "email": "string",
                "password": "string"
            }
            ```

            ### Response

            #### Success Response (Status Code: 200)

            ```json
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "captain": {
                    "_id": "64a1b2c3d4e5f6g7h8i9j0",
                    "fullname": { "firstname": "John", "lastname": "Doe" },
                    "email": "john.captain@example.com",
                    "vehicle": { "color": "Blue", "plate": "XYZ123", "capacity": 4, "vehicleType": "car" },
                    "status": "inactive",
                    "socketId": null
                }
            }
            ```

            ---

            ### Example Request

            ```bash
            curl -X POST http://localhost:3000/captain/login \
                -H "Content-Type: application/json" \
                -d '{ "email": "salim@example.com", "password": "securePassword123" }'
            ```

            ---

            ## Captain Profile Endpoint

            ### Endpoint: `GET /captain/profile`

            #### Description

            Retrieves the authenticated captain's profile. This is a protected endpoint and requires a valid token (cookie or Authorization header).

            ---

            ### Authentication

            Provide the token via cookie (`token`) or `Authorization: Bearer <token>` header.

            ---

            ### Response

            #### Success Response (Status Code: 200)

            ```json
            {
                "captain": {
                    "_id": "64a1b2c3d4e5f6g7h8i9j0",
                    "fullname": { "firstname": "Salim", "lastname": "Khan" },
                    "email": "salim@example.com",
                    "vehicle": { "color": "Blue", "plate": "XYZ123", "capacity": 4, "vehicleType": "car" },
                    "status": "inactive",
                    "socketId": null
                }
            }
            ```

            Note: The response wraps the captain object in a `captain` key (see controller response).

            ---

            ### Example Request

            ```bash
            curl -X GET http://localhost:3000/captain/profile \
                -H "Authorization: Bearer eyJhbGciOi..."
            ```

            ---

            ## Captain Logout Endpoint

            ### Endpoint: `GET /captain/logout`

            #### Description

            Logs out the authenticated captain by blacklisting the current token and clearing the `token` cookie.

            ---

            ### Response

            #### Success Response (Status Code: 200)

            ```json
            {
                "message": "Logged out successfully"
            }
            ```

            ---

            ### Example Request

            ```bash
            curl -X GET http://localhost:3000/captain/logout \
                -H "Authorization: Bearer eyJhbGciOi..."
            ```

            ---

            ### Notes

            - Passwords are hashed before storage (bcrypt, salt rounds: 10)
            - Tokens expire in 24 hours and are also stored in the blacklist on logout (24-hour TTL)
            - After logout the blacklisted token cannot be used even if the token is otherwise unexpired
            - The captain's password field is never returned in any response


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
