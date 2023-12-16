import mongoose, { Schema } from "mongoose";

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
  isBanned: {
    type: Boolean,
    require: true,
    default: false
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  articles: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article'
      }
    ],
    required: true,
    default: []
  }
});

const UserModel = mongoose.model('User', userScheme);

export default UserModel;