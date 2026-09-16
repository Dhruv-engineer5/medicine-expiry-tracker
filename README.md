# 💊 Medicine Expiry Tracker

A full-stack, multi-user web application designed to help users securely manage their medicines, track quantities and expiry dates, and quickly identify medicines that are expired, expiring soon, or safe.

## 🌐 Live Demo

👉 **[Open Live Website](https://medicine-expiry-tracker-zeta.vercel.app/)**

## 💻 GitHub Repository

👉 **[View Source Code](https://github.com/Dhruv-engineer5/medicine-expiry-tracker)**

## ⚙️ Backend API

👉 **[Open Backend](https://medicine-expiry-tracker-1.onrender.com)**

---

## 📸 Screenshots

### 🔐 Login / Register

Users can create an account and securely log in before accessing their personal medicine dashboard.

![Login and Register](screenshots/login-register.png)

### 📊 Dashboard

The dashboard provides an overview of the logged-in user's medicines, including total medicines, expired medicines, expiring soon medicines, safe medicines, quick statistics, and urgent medicines.

![Medicine Expiry Tracker Dashboard](screenshots/dashboard.png)

### 💊 Medicine List

Users can search and filter their own medicines while viewing expiry dates, quantities, current status, remaining days, and available actions.

![Medicine List](screenshots/medicine-list.png)

### ➕ Add / Edit Medicine

Users can add or update medicine information by entering the medicine name, expiry date, and quantity.

![Add or Edit Medicine](screenshots/add-edit-medicine.png)

---

## ✨ Features

- User registration
- User login and logout
- JWT-based authentication
- Protected medicine APIs
- User-specific private medicines
- Secure password hashing with bcrypt
- Add medicines
- Edit medicines
- Delete medicines
- Track medicine quantities
- Track medicine expiry dates
- Automatic expiry status calculation
- Expired medicine detection
- Expiring Soon detection
- Safe medicine detection
- Days remaining calculation
- Search medicines
- Filter medicines by status
- Dashboard statistics
- Most Urgent medicines section
- Responsive design
- MongoDB data persistence
- REST API integration
- Full CRUD functionality
- Multi-user data isolation

---

## 🔐 Authentication & Privacy

The application uses authentication so each user can access only their own medicine records.

### Authentication Flow

```text
Register
   ↓
User Account Created
   ↓
Login
   ↓
JWT Token
   ↓
Protected API Requests
   ↓
Only Logged-in User's Medicines
