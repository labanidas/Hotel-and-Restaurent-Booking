import jwt from 'jsonwebtoken';

export const generateToken = (userId, userRole, res) => {
    // Sign the token with userId and userRole as the payload
    const token = jwt.sign({ userId, role: userRole }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token expires in 7 days
    });

    // Set the token as an HTTP-only cookie
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevents XSS attacks
        sameSite: "strict", // Restricts the cookie to same-site requests
        secure: process.env.NODE_ENV !== "development", // Ensures cookie is only sent over HTTPS in production
    });

    // Return the token
    return token;
};

export default generateToken;
