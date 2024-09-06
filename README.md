## Todo Checklist

- [x] Get a local server running.
- [x] Get mongo url and settle the connection.
- [x] Define both user and job listing model.
- [x] Implement auth logic and implement a middleware.
- [x] Implement auth (signin, signup) for for users utilizing admin.
- [x] Implement the remaining User routes using router.
- [x] Add user router to the server.
- [x] Create required endpoints for job listings.
- [x] Add job listing router to the server.
- [] Implement Redis for advanced caching.
- [] Test all endpoints with postman or any other tool with test written in jest.

- [x] Document the API endpoints.

Sure, I'll generate the API documentation in Markdown format based on the provided routes and handlers in your codebase.

### API Documentation

#### Base URL

```
http://localhost:4000
```

### Authentication Routes

#### POST `/api/auth/signup`

- **Description**: Sign up a new user.
- **Request Body**:
  - [`name`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FAtharva%2FOneDrive%2FDesktop%2Fassignments%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A21%2C%22character%22%3A0%7D%7D%5D%2C%22250f4f79-6cdb-45e8-9519-032e0265dda8%22%5D "Go to definition") (string): The name of the user.
  - `email` (string): The email of the user.
  - `password` (string): The password of the user.
- **Responses**:
  - `201 Created`: User created successfully.
  - `400 Bad Request`: Invalid input data.

#### POST `/api/auth/signin`

- **Description**: Sign in an existing user.
- **Request Body**:
  - `email` (string): The email of the user.
  - `password` (string): The password of the user.
- **Responses**:
  - `200 OK`: User signed in successfully.
  - `401 Unauthorized`: Invalid credentials.

### User Routes

#### GET `/api/users`

- **Description**: Get all users.
- **Responses**:
  - `200 OK`: List of all users.

#### GET `/api/users/{id}`

- **Description**: Get a user by ID.
- **Path Parameters**:
  - `id` (string): The ID of the user.
- **Responses**:
  - `200 OK`: User details.
  - `404 Not Found`: User not found.

#### PUT `/api/users/{id}`

- **Description**: Update a user by ID.
- **Path Parameters**:
  - `id` (string): The ID of the user.
- **Request Body**:
  - [`name`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FAtharva%2FOneDrive%2FDesktop%2Fassignments%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A21%2C%22character%22%3A0%7D%7D%5D%2C%22250f4f79-6cdb-45e8-9519-032e0265dda8%22%5D "Go to definition") (string): The new name of the user.
  - `email` (string): The new email of the user.
- **Responses**:
  - `200 OK`: User updated successfully.
  - `404 Not Found`: User not found.

#### DELETE `/api/users/{id}`

- **Description**: Delete a user by ID.
- **Path Parameters**:
  - `id` (string): The ID of the user.
- **Responses**:
  - `200 OK`: User deleted successfully.
  - `404 Not Found`: User not found.

### Job Listings Routes

#### GET `/api/job-listings`

- **Description**: Get all job listings.
- **Responses**:
  - `200 OK`: List of all job listings.

#### GET `/api/job-listings/{id}`

- **Description**: Get a job listing by ID.
- **Path Parameters**:
  - `id` (string): The ID of the job listing.
- **Responses**:
  - `200 OK`: Job listing details.
  - `404 Not Found`: Job listing not found.

#### POST `/api/job-listings`

- **Description**: Create a new job listing.
- **Request Body**:
  - `title` (string): The title of the job.
  - `description` (string): The description of the job.
  - `company` (string): The company offering the job.
- **Responses**:
  - `201 Created`: Job listing created successfully.
  - `400 Bad Request`: Invalid input data.

#### PUT `/api/job-listings/{id}`

- **Description**: Update a job listing by ID.
- **Path Parameters**:
  - `id` (string): The ID of the job listing.
- **Request Body**:
  - `title` (string): The new title of the job.
  - `description` (string): The new description of the job.
  - `company` (string): The new company offering the job.
- **Responses**:
  - `200 OK`: Job listing updated successfully.
  - `404 Not Found`: Job listing not found.

#### DELETE `/api/job-listings/{id}`

- **Description**: Delete a job listing by ID.
- **Path Parameters**:
  - `id` (string): The ID of the job listing.
- **Responses**:
  - `200 OK`: Job listing deleted successfully.
  - `404 Not Found`: Job listing not found.

---