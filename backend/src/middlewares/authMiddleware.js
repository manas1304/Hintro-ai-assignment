import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export async function protect(req, res, next){
    
    let token;

    // Got some type errors here
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            
            token = req.headers.authorization.split(' ')[1]; // Getting the token because it looks like (Bearer <token>);
            
            // Decode the token to get userId
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Putting req.user so that we can use this later
            req.user = await User.findById(decoded.id);
            console.log(decoded);
            
            return next(); // Move to the next function

        }catch(err){
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if(!token){
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
}