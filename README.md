# Ticket Booking Microservices

A ticket booking system built with Node.js, React, and PostgreSQL using a microservices architecture.

## Architecture

The system consists of three main microservices:

1. **Auth Service** (Port: 3000)
   - User authentication and authorization
   - User management
   - JWT token validation

2. **Tickets Service** (Port: 3002)
   - Ticket management
   - Event listings
   - Seat reservations

3. **Orders Service** (Port: 3003)
   - Order processing
   - Payment integration
   - Order status management

4. **Client** (Port: 3001)
   - React frontend application
   - Material-UI interface
   - Responsive design


## Database Design

The system uses PostgreSQL databases, with each service having its own database:

1. **auth database**
   ```sql
   CREATE TABLE "Users" (
       id SERIAL PRIMARY KEY,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       role VARCHAR(50) DEFAULT 'user',
       status VARCHAR(50) DEFAULT 'active',
       "lastLogin" TIMESTAMP WITH TIME ZONE,
       "createdAt" TIMESTAMP WITH TIME ZONE,
       "updatedAt" TIMESTAMP WITH TIME ZONE
   );
   ```

2. **tickets database**
   ```sql
   CREATE TABLE "Tickets" (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255),
       description TEXT,
       price DECIMAL(10,2),
       category VARCHAR(50),
       venue VARCHAR(255),
       date TIMESTAMP WITH TIME ZONE,
       totalSeats INTEGER,
       availableSeats INTEGER,
       status VARCHAR(50),
       imageUrl VARCHAR(255),
       userId INTEGER,
        "createdAt" TIMESTAMP WITH TIME ZONE,
       "updatedAt" TIMESTAMP WITH TIME ZONE
   );
   ```

3. **orders database**
   ```sql
   CREATE TABLE "Orders" (
       id SERIAL PRIMARY KEY,
       "userId" INTEGER NOT NULL,
       "ticketId" INTEGER NOT NULL,
       status VARCHAR(50),
       amount DECIMAL(10,2),
       "createdAt" TIMESTAMP WITH TIME ZONE,
       "updatedAt" TIMESTAMP WITH TIME ZONE
   );
   ```

   ## API Documentation

1. **Auth Service API**
   - POST /api/auth/signup - Register new user
   - POST /api/auth/login - User login
   - GET /api/auth/me - Get current user info

2. **Tickets Service API**
   - GET /api/tickets - Get ticket listings
   - POST /api/tickets - Create new ticket
   - GET /api/tickets/:id - Get ticket details

3. **Orders Service API**
   - POST /api/orders - Create order
   - GET /api/orders - Get user orders
   - GET /api/orders/:id - Get order details

Start Auth Service
cd auth-service
npm start
Start Tickets Service
cd tickets-service
npm start
Start Orders Service
cd orders-service
npm start
Start Frontend Application
cd client
npm start