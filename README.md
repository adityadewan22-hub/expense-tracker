Expense Tracker

A full-stack web application to manage personal finances by adding, editing, deleting, and categorizing expenses. The app provides an overview of balance and date-wise expense tracking with a clean and responsive UI.

🚀 Features
🔐 Authentication – User login/register with JWT-based security
➕ Add / Edit / Delete expenses
📂 Categorize expenses (Food, Travel, Shopping, etc.)
📅 Date-wise tracking of expenses
💾 Persistent storage with MongoDB
🎨 Responsive UI/UX built with React + TailwindCSS

🛠️ Tech Stack
Frontend: React, TypeScript, TailwindCSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Auth: JWT (JSON Web Tokens)
Deployment: [Vercel / Render / Heroku]

⚡ Getting Started
1️⃣ Clone the repo
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in the root and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Run the app
npm run dev


Frontend: http://localhost:5173
Backend: http://localhost:3000

📦 Folder Structure
expense-tracker/
 ├── client/        # React frontend
 ├── server/        # Express backend
 ├── models/        # MongoDB schemas
 ├── routes/        # API routes
 ├── controllers/   # Request handlers
 └── README.md

📚 Future Improvements
📈 Expense analytics with charts (monthly/yearly trends)
📤 Export reports (CSV/PDF)
🌙 Dark mode support
🤝 Contributing

Contributions are welcome! Please fork the repo and submit a PR.

🧑 Author
Aditya Dewan

GitHub: adityadewan22-hub
