# 💸 Expense Tracker

A full-stack expense tracking application that allows users to add, edit, and delete their daily expenses while visualizing spending trends. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

- Add, edit, and delete expenses
- Categorize and filter by date or type
- Visual summary of expense history
- Responsive UI for desktop and mobile
- Backend API for data persistence using MongoDB Atlas

## 🛠 Technologies Used

| Frontend         | Backend        | Database   |
|------------------|----------------|------------|
| React.js         | Node.js        | MongoDB    |
| React Router     | Express.js     | Mongoose   |
| Axios            | dotenv         | MongoDB Atlas |

## 📦 Installation

### Clone the repo

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

### Setup Environment Variables

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

### Run the app

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm start
```

## 🧪 Sample Data Format

```json
{
  "title": "Grocery Shopping",
  "amount": 1200,
  "category": "Food",
  "date": "2025-07-30"
}
```

## 📈 Future Improvements

- Add user authentication
- Monthly/weekly expense breakdown
- Export data to CSV
- Dark mode toggle

## 🙌 Author

Built with 💙 by [Esakkiammal](https://github.com/Esakkiammal-G)
