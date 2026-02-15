import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';

// Logic to create a token for the user
function generateToken(userId){
    const secret = process.env.JWT_SECRET;
    const options = {expiresIn: '30d'};

    //Creating token using userId
    const token = jwt.sign({id: userId}, secret, options);
    return token;
}

// Logic for signup
export async function registerUser(req, res){
    try{
        const {name, email, password} = req.body;

        // Check if user already exists
        const userExists = await User.findOne({email: email});
        if(userExists){
            return res.status(400).json({message: 'User already exists!'})
        }

        // Create new User
        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        })

        // If user is created successfully sending data
        if(newUser){
            const token = generateToken(newUser._id)
            return res.status(200).json({
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                token: token
            })
        }

    }catch(err){
        return res.status(500).json({message: 'Server Error' + err.message});
    }

}


// Logic for login
export async function loginUser(req, res){
    try{

        const {email, password} = req.body;

        const user = await User.findOne({email: email}).select('+password')
        // Since we have select: false ( we are not showing for security ) so we need to explicitly declare that we need password
        // here for correct authentication

        // If user not found
        if(!user){
            return res.status(400).json({message: "Invalid email or password"})
        }

        // Check if the password matches
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"});
        }

        // If everthing is correct then we can send data
        const token = generateToken(user._id);
        return res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: token
        })

    }catch(err){
        return res.status(500).json({message: "Server Error" + err.message})
    }
}