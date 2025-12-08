Here are the detailed summaries for the Login and Registration logic.

## Registration Logic Summary

The registration process is a standard client-server flow involving client-side validation, a server-side API endpoint, data validation, password hashing, and database insertion.

### Key Files Involved

-   **Client UI**: `client/src/pages/Registration/RegistrationForm.tsx`
-   **Client State/API**: `client/src/app/providers/Auth/AuthProvider.tsx`, `client/src/hooks/api/useUsers.ts`
-   **Client Validation**: `client/src/schemas/registerSchema.ts` (Joi-like schema for `react-hook-form`)
-   **Server Router**: `server/router/router.js`
-   **Server Controller**: `server/features/users/routes/usersController.js`
-   **Server Service**: `server/features/users/services/usersService.js`
-   **Server Validation**: `server/features/users/validations/Joi/registerValidation.js`
-   **Server DB Access**: `server/features/users/models/usersDataAccessService.js`
-   **Server Hashing**: `server/features/users/helpers/bcrypt.js`
-   **Server Model**: `server/features/users/models/mongodb/User.js`

---

### Client-Side Flow

1.  **User Interaction**: The user navigates to the registration page and fills out the form located in `RegistrationForm.tsx`.
2.  **Form Management**: The component uses the `react-hook-form` library to manage form state and validation.
3.  **Validation**: Before submitting, the user's input is validated against the schema defined in `client/src/schemas/registerSchema.ts`. This provides immediate feedback to the user if the data is invalid (e.g., password complexity, valid email format).
4.  **Submission**: On successful client-side validation, the `onSubmit` function is called. This function retrieves the `register` method from the `useAuth()` hook (which comes from `AuthProvider.tsx`).
5.  **API Call**: The `register` method in `AuthProvider` calls the `registerUser` function from the `useUsers` custom hook (`client/src/hooks/api/useUsers.ts`).
6.  **HTTP Request**: The `registerUser` function sends a **`POST`** request to the **`/users/`** endpoint with the form data as the request body.

---

### Server-Side Flow

1.  **Routing**: The incoming `POST /users/` request is caught by the main router (`server/router/router.js`) and directed to the `usersController`.
2.  **Controller**: The `usersController` (`server/features/users/routes/usersController.js`) maps the `POST /` route to the `registerUser` function in the `usersService`.
3.  **Service Layer**: The `registerUser` service function (`server/features/users/services/usersService.js`) orchestrates the registration process:
    a.  **Server-Side Validation**: It first validates the incoming `rawUser` data against a Joi schema (`server/features/users/validations/Joi/registerValidation.js`) to ensure data integrity.
    b.  **Normalization**: The user data is passed through `normalizeUser` to set default values (e.g., for `profileImage`).
    c.  **Password Hashing**: The user's plain text password is securely hashed using `bcrypt.hashSync` with a salt round of 10 in the `generateUserPassword` function (`server/features/users/helpers/bcrypt.js`).
    d.  **Database Interaction**: The normalized user object (with the hashed password) is passed to the `register` function in `usersDataAccessService.js`.
4.  **Data Access Layer**:
    a.  The `register` function (`server/features/users/models/usersDataAccessService.js`) checks if a user with the same `email` or `nickname` already exists in the database. If so, it throws an `AlreadyExistsError`.
    b.  If the user is unique, a new `User` (Mongoose model) is created and `.save()` is called to insert it into the MongoDB database.
5.  **Response**:
    a.  After successful insertion, the database service returns a sanitized user object (containing `_id`, `name`, `email`) back up the chain.
    b.  The `usersController` sends a `201 Created` status code along with the new user data back to the client.
6.  **Client Response Handling**: The client receives the response, and the `AuthProvider` logic can then decide what to do, such as showing a success message and redirecting the user to the login page.
