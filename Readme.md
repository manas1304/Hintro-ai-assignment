# - Heading
## - Subheading

# TaskFlow - Real-Time Kanban Project Management

TaskFlow is a high-performance, full-stack Kanban application designed for seamless team collaboration. It features real-time synchronization, dynamic member assignment, and a fluid drag-and-drop interface.

# Prerequisites:

Node.js: v18.x or higher
MongoDB: A local instance or MongoDB Atlas URI

# Installation

1. ## Clone the Repo
git clone https://github.com/manas1304/Hintro-ai-assignment
cd hintro-ai

2. ## Setup Backend
cd backend
npm install
Create a .env file with:
PORT=5000
MONGODB_URI=mongodb+srv://manasHintro1304:6yMRtiMhwdKjZmD7@cluster0.olhwcqy.mongodb.net/hintro_db?appName=Cluster0
JWT_SECRET='hintroSecretString'
JWT_EXPIRES_IN=7d
npm run dev

3. ## Setup Frontend
cd frontend
npm install
npm run dev

## Demo Credentials
Email: manas@test.com  Password: password123 ( Primary )
Email: tester@test.com  Password: password123
Email: tester2@test.com  Password: password123



# Architecture Explanation

## Frontend Architecture

Framework: Next.js 14 (App Router) for optimized routing and server-side rendering.
State Management: React Hooks (useState, useEffect) manage local UI states and data fetching.
UI/UX: Tailwind CSS for a responsive, modern interface.
Interactivity: @dnd-kit provides the core drag-and-drop logic for moving tasks across columns.

## Backend Architecture

Server: Node.js with Express.js providing a robust REST API.
Database: MongoDB with Mongoose ODM for schema enforcement and data validation.
Authentication: JWT (JSON Web Tokens) for secure, stateless user sessions.

## Real-Time Sync Strategy

Socket.io Integration: Utilizes a "Room-based" strategy where users join a specific room based on their boardId.
Broadcasting: When a task is moved or assigned, the server emits a boardUpdated event strictly to that room, triggering an automatic data refresh for all active members.

# Database Schema Design

User: Stores credentials and profile info.
Board: Links to an Owner and an array of Members (Ref: User).
List: Belongs to a Board; contains a title and position.
Task: Links to a ListId and BoardId. Contains an Assignees array (Ref: User) to track project responsibility.

# Database Schema Diagram





# API Documentation 

Method     Endpoint                      Description

POST      /api/auth/signup                Register a new user
POST      /api/boards                     Create a new project board
GET       /api/boards/:id                 Fetch board data with populated members
POST      /api/tasks                      Create a task within a specific list
PUT       /api/tasks/:id                  Update task title or description
POST      /api/tasks/:taskId/assign       Assign/Add a member to a task
DELETE    /api/tasks/:id                  Permanently remove a task



# Assumptions & Trade-offs

Assumption: User assignment is restricted to users who have already been added as "Members" to the board via the Share modal.
Trade-off: LocalStorage for JWT: Chosen for faster development of this MVP; however, in a production environment, httpOnly cookies would be used to handle XSS risks.
