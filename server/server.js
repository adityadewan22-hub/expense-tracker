import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import expenseRoutes from './routes/expenseRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/expense', expenseRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is properly connected!');
});

// Connect to MongoDB and start server
const PORT = parseInt(process.env.PORT) || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
  });