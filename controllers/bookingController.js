import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';

export const bookTickets = async (req, res) => {
  const { movieId, showtime, tickets } = req.body;
  console.log(req.user.id)
  const userId = req.user.id
  
  console.log('Booking Request:', { movieId, showtime, tickets, userId });
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    console.log('Movie ID:', movieId);

    const booking = new Booking({
      user: userId,
      movie: movieId,
      showtime,
      tickets,
      paymentStatus: 'Paid' 
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error('Booking failed:', err.message);
    res.status(500).json({ message: 'Booking failed' });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('movie');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get bookings' });
  }
};

export const cancelBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findOneAndDelete({ _id: bookingId, user: req.user.id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json({ message: 'Booking canceled' });
  } catch (err) {
    res.status(500).json({ message: 'Cancel failed' });
  }
};
