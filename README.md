# 👾 Bug Reporter - Backend

A secure RESTful backend API for a bug report wizard. It handles user authentication as well as user specific linked data storage. It is used to save and track details of bugs found on specific projects.

📌 Note on Live Demo - The backend for this application is hosted on Render’s free tier, meaning the first request may take 30 to 50 seconds while the web service spins up. Subsequent requests will load normally. Thank you for your patience!

[![Live Demo](https://img.shields.io/badge/Live_Demo-Here-brightgreen?style=for-the-badge)](link)
[![Tech Stack](https://img.shields.io/badge/Stack-Node.js_|_Express_|_Typescript_|_MongoDB_|_Mongoose-blue?style=for-the-badge)](#tech-stack)

---

## ✨ Key Features & Technical Highlights

* **Stateless JWT Authentication:** Implements password hashing via **Bcrypt** and issues signed **JSON Web Tokens (JWT)** for secure, stateless session management across requests.
* **Per-User Data Isolation:** Enforces user-scoped database queries in **MongoD**, ensuring strictly segregated data access and manipulation.
* **Strict Type Safety:** Built fully in **TypeScript**, using database models and Express custom request extensions.
* **Robust Input Sanitization:** Uses **Express Validator** middleware to block malformed or malicious request bodies before hitting controller logic.
* **Error Logging:** Configured **Winston** logging to track system errors.
* **Interactive OpenAPI Docs:** Fully documented API endpoints rendered dynamically with Swagger UI, enabling interactive route testing.

---

<a id="tech-stack"></a>
## 🛠️ Tech Stack & Resources

* **Core & Runtime:**
  * `Node.js` - Asynchronous JavaScript runtime environement used to run server-side logic and handle network requests
  * `Express` - Web application framework used to define RESTful routes, handle requests and integrate middleware.
  * `TypeScript` -  Strongly typed development ensuring interface enforcement across models, services, and route handlers.

* **Database & Persistence:**
  * `MongoDB` - NoSQL document database providing flexible JSON-like storage.
  * `Mongoose` - Object Data Modeling (ODM) library used to structure database schemas, enforce validations and handle asynchronous database queries.

* **Security & Authentication:**
  * `JSON Web Tokens (JWT)` - Generates signed, stateless authentication tokens to protect private routes and manage user sessions 
  * `Bcrypt` - Cryptographic utility used to hash and salt user passwords used before database storage and to verify login credentials 

* **Validation & logging:**
  * `Express Validator` - Request payload validation and sanitization.
  * `Winston` - Structured multi-transport logging for application errors and HTTP events.

* **API Documentation:**
  * `Swagger (OpenAPI)` - Interactive API documentation and visual testing environment.

---

## 🌟 Future Updates

* **Improve Token Invalidation:** Make active JWTs invalid when a user signs out**
* **Add Bug + Project Updating:** Create PATCH requests to edit bugs or projects**

---