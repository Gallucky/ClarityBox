# ClarityBox Database Documentation

## 1. Overview

MongoDB is used to store users, projects, tasks, gratitude boxes, and favorites. Relationships are represented via references (ObjectId).

## 2. Collections

### Users

-   `_id`: ObjectId
-   `username`: string
-   `email`: string
-   `password`: hashed string
-   `role`: enum ['admin', 'user']
-   `profileImage`: string
-   `favorites`: [ObjectId] (referencing Projects / Gratitude Boxes)
-   `createdAt`, `updatedAt`: timestamps

### Projects

-   `_id`: ObjectId
-   `name`: string
-   `description`: string
-   `ownerId`: ObjectId (User reference)
-   `tasks`: [ObjectId] (Tasks reference)
-   `createdAt`, `updatedAt`: timestamps

### Tasks

-   `_id`: ObjectId
-   `name`: string
-   `description`: string
-   `status`: enum ['Not Started', 'In Progress', 'Completed']
-   `priority`: enum ['Low', 'Medium', 'High']
-   `projectId`: ObjectId (Project reference)
-   `createdAt`, `updatedAt`: timestamps

### Gratitude Boxes

-   `_id`: ObjectId
-   `title`: string
-   `content`: string
-   `ownerId`: ObjectId
-   `favoritedBy`: [ObjectId] (Users who saved this)
-   `createdAt`, `updatedAt`: timestamps

## 3. Notes

-   All sensitive info (passwords) hashed
-   Use indexes on frequently queried fields (e.g., email, username)
-   Maintain consistent ObjectId references for relations
