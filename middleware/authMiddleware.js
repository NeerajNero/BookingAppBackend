import jwt from 'jsonwebtoken';


export const authMiddleware = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader  = req.headers.authorization

  console.log(authHeader)
  console.log(JWT_SECRET)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No or bad auth header:', authHeader);
    return res.status(401).json({ message: 'No token, auth denied' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};
