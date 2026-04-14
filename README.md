# 💸 Expense Analyzer (MERN Stack)

A modern full-stack expense management and analytics web app that helps users track, analyze, and optimize their spending.

---

## 🚀 Features

### 🔐 Authentication

* User Sign Up / Sign In
* Secure JWT-based authentication
* Protected routes

---

### 📊 Dashboard (Core)

* Summary cards:

  * Total spending
  * Today’s spending
  * Monthly spending
  * Top category
* Clean and responsive UI (Tailwind CSS)

---

### 💰 Expense Management

* Add expenses with:

  * Name
  * Amount
  * Description
  * Category
  * Payment method
  * Date
* Delete expenses
* View detailed expense page
* Update expense data

---

### 🔍 Smart Filtering & Sorting

* Search by name, category, description
* Filter by category
* Sort by:

  * Latest
  * Oldest
  * Highest amount
  * Lowest amount

---

### 📄 Expense Navigation

* Dashboard shows latest 5 expenses
* "View All" page for complete list
* Click any expense → detailed editable page

---

### 🎨 UI/UX

* Fully responsive layout
* Tailwind CSS styling
* Clean card-based design
* Mobile-friendly

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Authentication

* JWT (JSON Web Token)

---

## 📂 Project Structure

```
client/
 ├── src/
 │    ├── pages/
 │    ├── components/
 │    ├── api.js
 │    └── App.js

server/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 └── app.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone repository

```bash
git clone https://github.com/your-username/expense-analyzer.git
cd expense-analyzer
```

---

### 2️⃣ Backend setup

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5500
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend setup

```bash
cd client
npm install
npm start
```

---

## 🌐 API Endpoints

### Auth

* POST /api/v1/auth/sign-up
* POST /api/v1/auth/sign-in

### Expenses

* GET /api/v1/expenses/all
* POST /api/v1/expenses/add
* DELETE /api/v1/expenses/delete/:id
* GET /api/v1/expenses/:id
* PUT /api/v1/expenses/update/:id

---

## 🔮 Future Improvements

* 📈 Charts (spending trends, category breakdown)
* 🤖 AI Expense Coach (chatbot for financial advice)
* 📊 Budget tracking system
* 🔔 Smart spending alerts
* 📱 Mobile app version

---

## 💡 Motivation

This project was built to go beyond a basic CRUD app by integrating:

* Real-time analytics
* Clean UI/UX
* Scalable architecture

---

## 📌 Author

Rahil
GitHub: https://github.com/RahilMaiyani

---
