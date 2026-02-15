import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export async function protect(req, res, next){
    
    let token;

    if(req.header.authorization && req.headers.authorization.startswith('Bearer')){
        try{
            
            token = req.header.authorization.split('')[1]; // Getting the token because it looks like (Bearer <token>);
            
            // Decode the token to get userId
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id);
            
            next(); // Move to the next function

        }catch(err){
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if(!token){
        res.status(401).json({ message: 'Not authorized, no token' });
    }
}