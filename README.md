# 🍴 Fork and Footprint 👣

A secure, simple blog application built with Node.js and Express, featuring user authentication powered by IBM Cloud App ID.

![Fork and Footprint Screenshot](https://i.ibb.co/hK7JqfS/WEE.jpg)
*Screenshot of the running application.*

---

## 🚀 Features

* **Secure User Authentication**: Handles user sign-up, login, and logout using the robust IBM App ID service.
* **Protected Routes**: Only authenticated users can create new blog posts. The application correctly distinguishes between public and private content.
* **Dynamic Blog Content**: Users can create new posts that are added to the homepage in real-time (using an in-memory array for simplicity).
* **Custom Styled UI**: A styled user interface with a custom logo and background image.

---

## 💻 Technology Stack

* **Cloud Service**: **IBM Cloud App ID** for identity management.
* **Backend**: **Node.js** with the **Express.js** framework.
* **Authentication Middleware**: **Passport.js** to integrate App ID with Express.
* **Version Control**: **Git** & **GitHub**.

---

## 🔧 Getting Started & How to Run

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need the following software installed on your computer:
* [Node.js and npm](https://nodejs.org/)
* [Git](https://git-scm.com/)
* A free [IBM Cloud Account](https://cloud.ibm.com/registration)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/abhiawasthi-cmyk/app_id_project.git](https://github.com/abhiawasthi-cmyk/app_id_project.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd app_id_project
    ```

3.  **Install NPM packages:**
    ```bash
    npm install
    ```

### Configuration

This project requires credentials from an IBM App ID instance.

1.  Create an **App ID** service instance on [IBM Cloud](https://cloud.ibm.com/).
2.  Inside your App ID instance, create a new **Application** and get your credentials (`tenantId`, `clientId`, `secret`, `oauthServerUrl`).
3.  Open the `server.js` file and replace the placeholder credentials in the `passport.use(new WebAppStrategy({...}))` section with your own.
4.  In your App ID dashboard, go to **Manage Authentication -> Authentication Settings** and add the following URL to your **Web redirect URLs**:
    ```
    http://localhost:3000/appid/callback
    ```

### Running the App

Once configured, you can start the server:
```bash
node server.js