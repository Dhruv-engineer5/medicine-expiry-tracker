# Medicine Expiry Tracker

A full-stack web application for managing household medicines, tracking quantities, and monitoring expiry dates.

## Features

- Add medicines
- Edit medicines
- Delete medicines
- Track medicine quantity
- Track expiry dates
- Automatic expiry status
- Expired medicines detection
- Expiring Soon detection
- Safe medicines detection
- Days remaining calculation
- Search medicines
- Filter by status
- Dashboard with medicine statistics
- Most urgent medicines section
- Responsive design

## Expiry Status

The application automatically calculates medicine status based on the expiry date.

| Status | Condition |
|---|---|
| Expired | Expiry date has passed |
| Expiring Soon | Expiry is within 30 days |
| Safe | More than 30 days remaining |

## Tech Stack

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

### Tools

- Git
- GitHub
- VS Code

## Project Structure

```text
medicine-expiry-tracker/
│
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
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── index.html
│
├── .gitignore
└── README.md

API Endpoints
Get all medicines
GET /api/medicines
Get single medicine
GET /api/medicines/:id
Add medicine
POST /api/medicines

Example request:

{
  "name": "Paracetamol",
  "expiryDate": "2027-06-30",
  "quantity": 10
}
Update medicine
PUT /api/medicines/:id
Delete medicine
DELETE /api/medicines/:id
Installation
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
2. Open the project
cd medicine-expiry-tracker
3. Install backend dependencies
cd backend
npm install
4. Configure environment variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
5. Start backend
npm run dev

Backend will run on:

http://localhost:5000
6. Install frontend dependencies

Open another terminal:

cd frontend
npm install
7. Start frontend
npm run dev

Frontend will run on:

http://localhost:5173
Future Improvements
User authentication
Medicine categories
Multiple medicine batches
Reminder notifications
Email notifications
Low-stock alerts
Export medicine data
Dark mode
Cloud deployment

Author:
Dhruv a Ghodasaras