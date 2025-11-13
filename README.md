# Easy-Split-
ake a picture of the receipt and have the app tell you how much each person owes, then connects you with mobile banking so you can split evenly. Keeps track of spending for others. 


## Authentication API Routes

### 1. Google OAuth

- **GET `/api/auth/google/login`**  
  Redirects the user to Google’s OAuth consent screen to initiate login.

- **GET `/api/auth/google/auth`**  
  Callback endpoint for Google OAuth. Retrieves user info, registers new users if needed, and returns a JWT access token.  

---

### 2. User Registration

- **POST `/api/auth/register`**  
  Registers a new user with the following fields:  
  - `username` (required, unique)  
  - `email` (required, unique)  
  - `password` (required)  
  - `name` (optional)  
  - `birthdate` (optional, format: YYYY-MM-DD)  
  - `phone_number` (optional)  

**Responses:**  
- `201 Created` – User successfully registered  
- `400 Bad Request` – Validation errors (duplicate username/email, missing password, invalid birthdate)

---

### 3. User Login

- **POST `/api/auth/login`**  
  Logs in a user using **username or email** and password. Returns a JWT access token.  

**Responses:**  
- `200 OK` – Login successful, returns JWT  
- `401 Unauthorized` – Invalid credentials or OAuth-only user attempting password login  

---

### 4. Protected User Info

- **GET `/api/auth/me`**  
  Requires a valid JWT. Returns the current user’s information:  
  - `id`  
  - `username`  
  - `email`  
  - `phone_number`  

---

**Notes:**  
- All JWTs use `user.id` as the identity (string).  
- OAuth users cannot login with a password.  
- Registration handles birthdate conversion and optional fields.  
