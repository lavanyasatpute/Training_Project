
# 🎉 Event Management System

A full-stack event management platform built with **Angular**, **Node.js**, **TypeORM**, and **Microsoft SQL Server**.  
It covers **event creation**, **registration**, **ticketing**, **attendee tracking**, and **feedback collection** — ensuring a seamless event lifecycle.

---

## 🚀 Features

- **Event Creation**  
  Create, edit, and manage events with titles, descriptions, schedules, locations, and categories.

- **User Registration**  
  Secure user sign-up, login, and profile management.

- **Ticketing System**  
  Integrated payment gateway, e-ticket generation, and ticket inventory tracking.

- **Attendance Tracking**  
  Check-in attendees using QR codes or unique IDs.

- **Feedback and Surveys**  
  Post-event feedback collection, survey generation, and analytics reporting.

---

## 📋 RASD (Requirements, Architecture, System Design)

### ✅ Requirements

- **Functional**
  - Event CRUD operations
  - User registration & authentication
  - Ticket sales & inventory
  - Attendance tracking & feedback collection

- **Non-Functional**
  - Scalability for high traffic
  - Secure data & payment handling
  - High performance for real-time interactions

### 🏛 Architecture

| Layer     | Tech Stack                     |
|-----------|---------------------------------|
| Frontend  | Angular + Angular Material      |
| Backend   | Node.js (Express.js) + TypeORM   |
| Database  | Microsoft SQL Server (SSMS)      |
| ORM       | TypeORM                         |

### 🧩 System Modules

- **Event Management**: Create, update, and list events
- **User Module**: Registration, login, profile management
- **Ticketing Module**: Payment integration, e-ticket issuing
- **Attendance Module**: QR code check-ins
- **Feedback Module**: Post-event survey and analytics

---

## 🔥 API Endpoints

| Module         | Endpoint                  | Methods         |
|-----------------|----------------------------|-----------------|
| Events          | `/events`                  | GET / POST / PUT / DELETE |
| Registration    | `/register`                | POST             |
| Ticketing       | `/tickets`                 | GET / POST       |
| Feedback        | `/feedback`                | POST             |
| User Management | `/user`                    | GET / POST / PUT / DELETE |

---

## 🛠 Implementation Steps

### Frontend (Angular)

1. Initialize project:  
   ```bash
   ng new event-management-system
   ```

2. Install UI libraries: Angular Material or Bootstrap.

3. Build Components:  
   - Event List
   - Event Details
   - Registration
   - User Profile
   - Feedback Form

4. Integrate REST APIs via Angular `HttpClient`.

5. Manage State using RxJS or NgRx.

### Backend (Node.js + TypeORM)

1. Initialize project:  
   ```bash
   npm init
   ```

2. Install dependencies:  
   ```bash
   npm install express typeorm mssql jsonwebtoken
   ```

3. Configure TypeORM with SSMS connection.

4. Define entities:  
   - Event
   - User
   - Ticket
   - Feedback

5. Secure APIs with JWT Authentication.

6. Integrate Payment Gateway (Stripe or Razorpay).

### Database (SSMS)

- Tables:  
  - `Events`
  - `Users`
  - `Tickets`
  - `Feedback`

- Relationships:  
  - `One-to-Many` between `Event` and `Ticket`

- Indexing and stored procedures for optimization.

---

## 🌐 Deployment

| Component  | Platform                         |
|------------|-----------------------------------|
| Frontend   | AWS S3, Firebase Hosting          |
| Backend    | AWS EC2, Dockerized Node.js Server |
| Database   | Azure SQL, Cloud-hosted MSSQL      |

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
