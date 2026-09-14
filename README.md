Medicine Expiry Tracker

A full-stack medicine management application that helps users manage medicine stock, monitor expiry dates, and quickly identify medicines that are expired, expiring soon, or still safe to use.

The application provides a responsive dashboard, medicine search and filtering, expiry-status detection, quantity tracking, and persistent storage through MongoDB.

Live Demo

Open the Live Demo

GitHub Repository

View the GitHub Repository

Screenshots
Dashboard

The dashboard provides an overview of medicine inventory with total medicine count, expiry statistics, quick summary information, and a section highlighting the most urgent medicines.

Medicine List

The medicine list displays all stored medicines with their expiry dates, quantities, current status, remaining days, and edit/delete actions. Search and status filtering make it easier to find medicines quickly.

Add / Edit Medicine

The medicine form allows users to add new medicines or update existing records by entering the medicine name, expiry date, and quantity.

Features
Add new medicines
Edit existing medicines
Delete medicines
Track medicine quantity
Track medicine expiry dates
Automatic expiry status calculation
Detect expired medicines
Detect medicines expiring soon
Identify safe medicines
Calculate remaining days automatically
Search medicines by name
Filter medicines by expiry status
Dashboard statistics
Most urgent medicines section
Responsive user interface
Persistent data storage with MongoDB
RESTful backend API
Separate frontend and backend architecture
Production deployment using Vercel, Render, and MongoDB Atlas
Expiry Status

Medicine status is calculated automatically based on the expiry date.

Status	Rule	Meaning
🔴 Expired	Expiry date has passed	Medicine should no longer be considered safe to use
🟡 Expiring Soon	0–30 days remaining	Medicine requires attention soon
🟢 Safe	More than 30 days remaining	Medicine has sufficient time before expiry

The application also calculates the exact number of days remaining for each medicine.

Tech Stack
Frontend
React
Vite
Axios
CSS
Backend
Node.js
Express.js
MongoDB
Mongoose
Development & Deployment
Git
GitHub
Vercel
Render
MongoDB Atlas
Architecture

The application follows a client-server architecture:

┌─────────────────────────────┐
│       React + Vite          │
│         Frontend            │
│                             │
│  Dashboard                  │
│  Medicine List              │
│  Add/Edit Medicine          │
│  Search & Filtering         │
└──────────────┬──────────────┘
               │
               │ Axios / REST API
               ▼
┌─────────────────────────────┐
│      Node.js + Express      │
│          Backend            │
│                             │
│  Routes                     │
│  Controllers                │
│  Models                     │
│  Database Configuration     │
└──────────────┬──────────────┘
               │
               │ Mongoose
               ▼
┌─────────────────────────────┐
│       MongoDB Atlas         │
│                             │
│    Persistent Medicine Data │
└─────────────────────────────┘
Deployment Flow
GitHub
  │
  ├── Frontend ──► Vercel
  │
  └── Backend ───► Render
                      │
                      ▼
                 MongoDB Atlas
Project Structure
medicine-expiry-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── medicineController.js
│   ├── middleware/
│   ├── models/
│   │   └── Medicine.js
│   ├── routes/
│   │   └── medicineRoutes.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MedicineCard.jsx
│   │   │   ├── MedicineForm.jsx
│   │   │   ├── MedicineList.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── medicineService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── index.html
├── screenshots/
│   ├── dashboard.png
│   ├── medicine-list.png
│   └── add-edit-medicine.png
├── .gitignore
└── README.md

Environment files such as .env should remain local or be configured through the deployment platform and should not be committed to the repository.

API Endpoints

The backend exposes a RESTful API for medicine management.

Method	Endpoint	Description
GET	/api/medicines	Get all medicines
GET	/api/medicines/:id	Get a medicine by ID
POST	/api/medicines	Add a new medicine
PUT	/api/medicines/:id	Update an existing medicine
DELETE	/api/medicines/:id	Delete a medicine
Example API Flow
React Frontend
     │
     │ Axios Request
     ▼
Express REST API
     │
     │ Mongoose
     ▼
MongoDB Atlas
Local Installation
Prerequisites

Make sure the following are installed:

Node.js
npm
Git
MongoDB Atlas account
Clone the Repository
git clone https://github.com/Dhruv-engineer5/medicine-expiry-tracker.git

cd medicine-expiry-tracker
Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Configure your environment variables using a local .env file.

Example configuration:

PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string

Start the backend server:

npm start

The backend API will be available at:

http://localhost:5000

The exact port may be changed through the PORT environment variable.

Frontend Setup

Open a new terminal and navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Configure the frontend API URL in your local environment configuration.

Example:

VITE_API_URL=http://localhost:5000/api

Start the development server:

npm run dev

Vite will provide a local development URL, typically:

http://localhost:5173

The frontend communicates with the Express backend through Axios and the REST API.

Environment Variables

Environment variables are used to keep database credentials, API configuration, and deployment-specific values outside the source code.

Backend
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
Frontend
VITE_API_URL=http://localhost:5000/api

For production, configure the corresponding values in the Vercel and Render environment settings rather than committing them to GitHub.

Use the exact variable names configured in the application when deploying. Never commit database credentials, API secrets, or private environment configuration to the repository.

Deployment
Frontend — Vercel

The React/Vite frontend is deployed on Vercel.

Typical deployment flow:

GitHub Repository
        │
        ▼
      Vercel
        │
        ▼
Production Frontend

Set the frontend API environment variable to the deployed backend URL, for example:

VITE_API_URL=https://your-backend-url/api
Backend — Render

The Node.js/Express backend can be deployed through Render.

Typical deployment flow:

GitHub Repository
        │
        ▼
      Render
        │
        ▼
Express API
        │
        ▼
MongoDB Atlas

Configure the required backend environment variables in the Render dashboard.

Database — MongoDB Atlas

MongoDB Atlas is used for persistent cloud database storage.

The backend connects to MongoDB Atlas through Mongoose using the MongoDB connection string stored in an environment variable.

Future Improvements

Potential enhancements for future versions include:

User authentication and authorization
Multiple user profiles
Medicine categories
Manufacturer and dosage information
Low-stock alerts
Email or push notifications for upcoming expiry dates
Sorting by expiry date and quantity
Bulk medicine import/export
Data visualization and advanced analytics
Pagination for large medicine inventories
Improved accessibility
Dark/light theme support
Automated testing
CI/CD workflow with GitHub Actions
Author

Dhruv a Ghodasaras

GitHub: Dhruv-engineer5

License

No specific open-source license has been specified for this project. For public reuse, modification, and distribution permissions, add an appropriate LICENSE file to the repository.
