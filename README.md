# Secure Web Application Authentication using IBM App ID

This is a project for my IBM PBEL VIRTUAL INTERNSHIP that demonstrates how to implement a secure authentication system in a Node.js web application using the IBM Cloud App ID service.

## 🚀 Features

* **Secure User Login**: Delegates user authentication to IBM App ID, a robust Identity as a Service (IDaaS) platform.
* **Protected Routes**: The application has public routes accessible to everyone and protected routes that require a user to be logged in.
* **Session Management**: Uses `express-session` and `passport.js` to manage user sessions after login.
* **User Profile Information**: After logging in, the application displays basic user info (name, email) fetched from their profile.

## 💻 Technology Stack

* **Cloud Service**: IBM App ID
* **Backend**: Node.js, Express.js
* **Authentication**: Passport.js (`ibmcloud-appid` Strategy)
* **Language**: JavaScript

## 🔧 Getting Started & How to Run

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/abhiawasthi-cmyk/app_id_project.git](https://github.com/abhiawasthi-cmyk/app_id_project.git)
    cd app_id_project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Credentials:**
    You will need to create your own IBM App ID instance on IBM Cloud. Once created, get your `tenantId`, `clientId`, `secret`, and `oauthServerUrl` and add them to the `passport.use(new WebAppStrategy({...}))` section in the `server.js` file.

4.  **Run the application:**
    ```bash
    node server.js
    ```
    The application will be running at `http://localhost:3000`.