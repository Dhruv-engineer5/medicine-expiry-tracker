# Medicine Expiry Tracker

A full-stack web application designed to help users manage their medicines, track quantities and expiry dates, and quickly identify medicines that are expired, expiring soon, or safe to use.

---

## 🌐 Live Website

**Live Demo:**  
https://medicine-expiry-tracker-o8bfmqph0-dhruv-b425.vercel.app/

## 💻 GitHub Repository

**Repository:**  
https://github.com/Dhruv-engineer5/medicine-expiry-tracker

---

## 📸 Screenshots

### Dashboard

The dashboard provides a complete overview of the medicine inventory, including total medicines, expired medicines, medicines expiring soon, safe medicines, quick statistics, and the most urgent medicines.

![Medicine Expiry Tracker Dashboard](screenshots/dashboard.png)

---

### Medicine List

The medicine list allows users to search and filter medicines while viewing their expiry date, quantity, current expiry status, remaining days, and available actions.

![Medicine List](screenshots/medicine-list.png)

---

### Add / Edit Medicine

Users can add or edit medicine information by entering the medicine name, expiry date, and quantity.

![Add Medicine](screenshots/add-edit-medicine.png)

---

## ✨ Features

- Add medicines
- Edit existing medicines
- Delete medicines
- Track medicine quantity
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

---

## 📅 Expiry Status Rules

The application automatically calculates the current medicine status based on the expiry date.

| Status | Condition | Description |
|--------|-----------|-------------|
| 🔴 **Expired** | Expiry date has passed | Medicine has already expired |
| 🟡 **Expiring Soon** | 30 days or less remaining | Medicine is approaching its expiry date |
| 🟢 **Safe** | More than 30 days remaining | Medicine is currently within a safe expiry period |

The application also calculates the exact number of days remaining for each medicine.

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools & Deployment

- Git
- GitHub
- Vercel
- Render
- MongoDB Atlas

---

## 🏗️ Architecture

The project follows a full-stack client-server architecture.
                    ┌──────────────────────┐
                    │      React + Vite    │
                    │       Frontend       │
                    │                      │
                    │  Dashboard           │
                    │  Medicine List       │
                    │  Add / Edit Medicine │
                    │  Search & Filter      │
                    └──────────┬───────────┘
                               │
                               │ Axios / REST API
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    │                      │
                    │  Routes              │
                    │  Controllers         │
                    │  Models              │
                    │  Database Config     │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌──────────────────────┐
                    │    MongoDB Atlas     │
                    │   Persistent Data    │
                    └──────────────────────┘
 

📂 Project Structure:
medicine-expiry-tracker/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── medicineController.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   └── Medicine.js
│   │
│   ├── routes/
│   │   └── medicineRoutes.js
│   │
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MedicineCard.jsx
│   │   │   ├── MedicineForm.jsx
│   │   │   ├── MedicineList.jsx
│   │   │   └── StatusBadge.jsx
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── services/
│   │   │   └── medicineService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── index.html
│
├── screenshots/
│   ├── dashboard.png
│   ├── medicine-list.png
│   └── add-edit-medicine.png
│
├── .gitignore
└── README.md


🔌 API Endpoints
The backend provides RESTful API endpoints for complete medicine management.
| Method   | Endpoint             | Description                 |
| -------- | -------------------- | --------------------------- |
| `GET`    | `/api/medicines`     | Get all medicines           |
| `GET`    | `/api/medicines/:id` | Get a single medicine       |
| `POST`   | `/api/medicines`     | Add a new medicine          |
| `PUT`    | `/api/medicines/:id` | Update an existing medicine |
| `DELETE` | `/api/medicines/:id` | Delete a medicine           |


API Flow:
Frontend
   │
   │ Axios Request
   ▼
Express REST API
   │
   │ Mongoose
   ▼
MongoDB Atlas

🚀 Local Installation
Prerequisites
Make sure the following are installed on your system:
Node.js
npm
Git
MongoDB Atlas account
1. Clone the Repository:
git clone https://github.com/Dhruv-engineer5/medicine-expiry-tracker.git
Move into the project directory:
cd medicine-expiry-tracker

2. Backend Setup
Navigate to the backend folder:
cd backend
Install backend dependencies:
npm install
Create a local .env file inside the backend directory.
Example:
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
Start the backend server:
npm start
The backend will run on:
http://localhost:5000

3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
cd frontend
Install frontend dependencies:
npm install
Create a local .env file inside the frontend directory.
Example:
VITE_API_URL=http://localhost:5000/api
Start the frontend development server:
npm run dev
The application will normally be available at:
http://localhost:5173

🔐 Environment Variables
Backend Environment Variables
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
Frontend Environment Variables
VITE_API_URL=http://localhost:5000/api
For production deployment, configure these variables directly in the Vercel and Render dashboards.

☁️ Deployment
Frontend Deployment — Vercel
The frontend is deployed using Vercel.
GitHub
   │
   ▼
Vercel
   │
   ▼
React + Vite Frontend
Configure the production API URL in Vercel:
VITE_API_URL=https://your-backend-url/api
The live frontend is available at:
https://medicine-expiry-tracker-o8bfmqph0-dhruv-b425.vercel.app/

Backend Deployment — Render
The Node.js and Express backend can be deployed through Render.
GitHub
   │
   ▼
Render
   │
   ▼
Node.js + Express API
   │
   ▼
MongoDB Atlas
Configure the backend environment variables in Render:
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string

Database — MongoDB Atlas
MongoDB Atlas is used as the cloud database for persistent medicine data.
The backend connects to MongoDB Atlas using Mongoose and the MONGODB_URI environment variable.

🔮 Future Improvements
Possible future enhancements include:
*User authentication and authorization
*Multiple user accounts
*Medicine categories
*Manufacturer and dosage information
*Low-stock alerts
*Email notifications
*Push notifications for upcoming expiry dates
*Advanced medicine sorting
*Bulk import and export
*Data visualization and analytics
*Pagination for large datasets
*Automated testing
*GitHub Actions CI/CD
*Improved accessibility
*Dark mode support

👨‍💻 Author
Dhruv a Ghodasaras
GitHub:
https://github.com/Dhruv-engineer5

engineer5

📄 License:
This project currently does not include an open-source license.
To make the project officially open source, add an appropriate LICENSE file to the repository, such as the MIT License.

🌐 Project Links
Live Website:
https://medicine-expiry-tracker-o8bfmqph0-dhruv-b425.vercel.app/
GitHub Repository:
https://github.com/Dhruv-engineer5/medicine-expiry-tracker
