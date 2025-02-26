import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to verify JWT token
export const protectedRoute = async (req, res, next)=>{ // call next thing
    try{    
        const token  = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({message: "Unauthotized - No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Unauthotized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password"); // select everything except password; dont want to send password back to client

        if(!user){
            return  res.status(404).json({message: "User not found"});
        }
        req.user = user;
        
        next();
    }catch(error){
        console.log("Error in auth auth middlewear ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}


// ---------------------- Vendor -----------------------
export const protectedRouteVendor = async (req, res, next) => {
    if (req.user && req.user.role === 'Vendor') {
        next();
    } else {
        res.status(403).json({ message: "Forbidden - Only vendors can access this resource" });
    }
};

// ---------------------- Customer -----------------------
export const protectedRouteCustomer= async (req, res, next) => {
    if (req.user && req.user.role === 'Customer') {
        next();
    } else {
        res.status(403).json({ message: "Forbidden - Only Customers can access this resource" });
    }
};

// ---------------------- Admin -----------------------
export const protectedRouteAdmin = async (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: "Forbidden - Only Admins can access this resource" });
    }
};



// // Middleware for role-based access control
// export const authorize = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Access denied' });
//         }
//         next();
//     };
// };
