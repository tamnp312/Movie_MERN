import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true , "Please add full name"] },
    email: { type: String, required: [true , "Please add email"], unique: true , trim : true},
    password: { type: String, required: [true , "Please add password"] , minlength: [6 , "Password must be at least 6 characters"]},
    isAdmin: { type: Boolean, default: false },
    image: { type: String },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
}
, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;