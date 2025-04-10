import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    console.log(JWT_SECRET)

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    console.log(newUser)

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '2d' });

    console.log(token)

    res.status(201).json({ token, user: { id: newUser._id, email: newUser.email } });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2d' });
    console.log(token)
    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
