import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true // Removes whitespace from end and beginning of the String before saving
    },

    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength:6,
        select: false // Hides passwords from API respones by default
    },
}, {timestamps: true})

// Hashing password before saving it to the database
userSchema.pre('save', async function (){
    console.log("Pre save hook triggered")
    if(!this.isModified('password')) return next(); // If the password has not been modified( in update operation ) then directly move to the next operation

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt) // Plain text gets replaced with hash 
    }catch(err){
        throw err
    }
})

// Method to verify password during login
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;