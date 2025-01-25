# Backend-application
Backend app for anonymous messages  
An innovative platform where users can send and receive messages anonymously while ensuring security, scalability, and performance.

🚀 Features

Database & Architecture
	•	NoSQL Database: Built using MongoDB with Mongoose for scalability and flexibility.
	•	Event-Driven Architecture: Utilized Node.js’s events module to optimize performance and enhance response times.

Secure Authentication & Authorization
	•	Middleware: Ensures only authenticated and authorized users can access specific resources.
	•	Email Verification: Secure email token (using JWT) or OTPs (using nanoId) for email confirmation.
	•	Password & OTP Security: All passwords and OTPs are hashed with bcrypt, while phone numbers are encrypted using CryptoJS for maximum security.

Account Management
	•	Session Management: Sessions are terminated across all devices when sensitive account details (e.g., password, email) are updated.
	•	Freeze Account: Users can temporarily freeze their accounts.
	•	Update Credentials: Secure updates for password and email with OTP verification to ensure account integrity.

Codebase Highlights
	•	Organized Folder Structure: Clear separation of concerns for maintainability.
	•	Validation: General field validations (using Joi) are reusable across the application.
	•	Centralized Common Files: Ensures consistency in functionality across all modules.
	•	Error Handling: Centralized error handling and predefined response formats for seamless debugging and user feedback.

🔧 Technical Highlights
	•	Reusable Validation Layers: Applied across all endpoints for consistent input validation.
	•	Secure Storage: Passwords, OTPs, and sensitive data are stored securely with encryption and hashing techniques.

📩 Key Functionalities
	•	Anonymous messaging with a secure and seamless user experience.
	•	Robust account and session management to enhance user control and security.