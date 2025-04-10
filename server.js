import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.get('/', (req,res) => {
    res.status(200).json("Hey There, Welcome!")
})

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
}).catch(err => console.error(err));
