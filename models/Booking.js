import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  showtime: {
    type: String,
    required: true,
  },
  tickets: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: 'Pending',
  },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
