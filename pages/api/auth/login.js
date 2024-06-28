import jwt from "jsonwebtoken";

// Mock user database
const users = [
  { id: 1, username: "user1", password: "1234567" },
  { id: 2, username: "user2", password: "12345678" },
];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Find user in the mock database
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Generate JWT token
      const token = jwt.sign(
        { username: user.username, userId: user.id },
        "@SA54#*ftr$&hj%$!@MNddr$#thj",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
