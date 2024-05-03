## Oauth2
## Project Structure
```javascript
/backend
│
├── src
│   ├── configs            # Configuration settings
│   ├── controllers        # Controllers for handling different routes
│   ├── middlewares        # for Allow authenticated 
│   ├── models             # MongoDB data models
│   └── index.js           # Entry point of the server
│
├── .env.example           # Example environment variables
└── package.json           # Node.js project dependencies and scripts
```
## Getting Started
- Provide step-by-step instructions on how to set up and run the backend on a local machine.

#### 1. Clone the Repository


> *`git clone <repository-url>`*
*`cd backend`*

#### 2. Install Dependencies

> *`npm install`*

#### 3. Set Environment Variables
- Create a `.env` file based on `.env.example` and set the required environment variables.

#### 4. Run the Server

> *`npm start`*


## Environment Variables

Explain the required environment variables and how to set them.

> **MONGO_DATABASE_UR:** MongoDB connection URIMONGODB_URI: MongoDB connection URI
> **JWT_SECRET_KEY:** Secret key for JWT authentication

