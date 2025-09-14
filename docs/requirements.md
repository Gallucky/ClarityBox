# Full Stack Web Development Final Project Requirements

## Main Requirements

-   A main website that includes a content display page.
-   A login system that provides access to the site management interface.
-   The management interface will allow: adding, editing, or deleting content.
-   The site’s content must be stored on the server side.
-   A module final project cannot be submitted as a final graduation project.

## Technology Requirements

-   The **Client** side must be built using [`React`](https://react.dev/) library.
-   The **Server** side must be implemented with [`Node.js`](https://nodejs.org/en).
-   The **Database** must be managed with [`MongoDB`](https://www.mongodb.com/).

## General Requirements

-   Maintain clean and organized code: remove console.log statements and commented-out code that is no longer needed.
-   Write code that tells a story, giving functions and variables meaningful names.
-   Structure the project into modules according to topics.
-   Follow coding conventions consistently.
-   Design is an integral part of presenting the project and demonstrating development skills. Even if you are not a designer by nature, ensure a clean and responsive design for different screen sizes.

**`Remember`**: this project will be part of your portfolio and represent you professionally to potential employers, so maintain both code quality and visual aesthetics.

## Client-Side Requirements (Summary)

-   **Design & Responsiveness**: Use CSS; split large files (>100 lines) by topic. Ensure a clean, responsive layout.
-   **Icons**: Use libraries like Font Awesome, Bootstrap Icons, or React Icons.
-   **Pages**:
    -   **Login/Registration**: Include headings, forms, validation (regex for passwords), and visual feedback.
    -   **About**: Explain the site and interaction.
    -   **Content Detail**: Show details when clicking content.
    -   **Favorites/Cart**: Users can mark content as favorite; preferences persist across devices.
-   **Navigation & Footer**: Dynamic menu across pages; footer with logo, copyright, and contact info.
-   **Accessibility**: `<title>` tag, favicon, and `alt` attributes for images.
-   **Forms**: Consistent design, field validation, visual feedback, submission only when complete.
-   **Authentication**: JWT token for login; do not store sensitive info in the token.
-   **CRUD Operations**: Allow create, read, update, delete; provide visual feedback.
-   **Permissions**: At least two roles: regular user (view/favorite) and admin (full CRUD).
-   **HTTP Requests**: Use Axios for HTTP requests with proper error handling.
-   **Content Filtering & Views**: Enable search, filters, and multiple content display modes (table/cards).
-   **Architecture & Code Quality**: Logical structure, clean, readable code, and console free of unnecessary logs.

## Server-Side Requirements (Summary)

-   **package.json**: Include `nodemon` in `devDependencies` and set the `"main"` field to the app entry file.
-   **REST API**: Use Express to handle CRUD operations according to client requests.
-   **Authentication & Authorization**: Authenticate all requests; only admins can add, edit, or delete data.
-   **Database**: Use MongoDB (local or cloud) with full CRUD support. Include `.env` for cloud keys.
-   **Validation**: Use Joi (or similar) for server-side validation; stop invalid data before saving to MongoDB.
-   **Routes & Models**: Organize code into modules for clarity and maintainability.
-   **Logging**: Use Morgan or a custom logger to track client requests in the console.
-   **Code Quality**: Use meaningful variable and function names; add concise comments for complex functions.

## Bonus Features (Summary)

-   **Logout**: Automatically log out users after 4 hours of inactivity.
-   **Request Limiting**: Limit the number of server requests a user can make in 24 hours to protect the server from overload or attacks.
-   **User Management Interface**: Admin page showing registered users in a table; allow editing, deleting, and changing roles between regular user and admin.
-   **Favorites/Orders Management**: Admin page showing content ranked by how many users marked it as favorite.
-   **Inventory Management**: For e-commerce sites, provide a page to manage stock; notify users when a product is out of stock.
-   **User Profile Picture**: Allow users to upload a profile picture stored in the project folder.
-   **Password Reset**: Provide a page for users to reset forgotten passwords, ensuring secure verification (e.g., via email link).

> For full technical details, refer to [Full PDF](.\assets\פרויקט מסכם קורס.pdf).
