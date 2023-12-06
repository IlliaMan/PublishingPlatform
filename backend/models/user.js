import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const UserModel = mongoose.model('User', userScheme);

export default UserModel;