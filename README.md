# Fullstack Social Media Application

This is a fullstack social media application built using TypeScript, React, Node.js with Express, MongoDB, and Socket.IO for instant messaging.

### [Live Preview](https://odin-book-production-0753.up.railway.app/)

![overview](./screenshots/gif.gif)

## Features

### User Authentication

- Allows users to sign up and log in securely.
- Utilizes JWT (JSON Web Tokens) for authentication and authorization.
- Password hashing for secure storage.
- PassportJS local strategy for authenticating login and jwt strategy.

### User Profile Management

- Users can create and edit their profiles (profile picture, cover picture, bio).
- Profile includes personal information, profile picture, bio, followers, etc.

### Posts and Feeds

- Users can create, edit, delete posts.
- Posts can contain text, images, or videos.
- Feed displays posts from friends or people the user follows.
- User can create comments, delete their comments, and comments on their posts from others.
- User can like dislike posts.

### Friend System

- Users can follow/unfollow users.

### Real-time Messaging

- Integrated Socket.IO for instant messaging.
- Users can send messages to friends in real-time.
- Choose different private chats.

### Responsive Design

- Mobile-friendly and responsive UI design.

## Tech Stack Used

- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- Real-time Messaging: Socket.IO
- Multer for handling photo upload

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository.
2. Install dependencies for the frontend and backend:

```
cd client
npm install
cd ../server
npm install
cd ../socket
npm install
```

3. Set up MongoDB and configure the database connection in the backend.
4. Start the backend server:

```
cd server
npm run dev

5. Start the frontend application:

```

cd client
npm run dev

```
cd socket
npm run dev
```

## Configuration

- Update the environment variables in the backend for JWT secret, database connection, etc.

## Contributing

Contributions are welcome! Feel free to fork the repository and create pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
