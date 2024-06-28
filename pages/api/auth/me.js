import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, '@SA54#*ftr$&hj%$!@MNddr$#thj');
      res.status(200).json({ username: decoded.username });
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
}
