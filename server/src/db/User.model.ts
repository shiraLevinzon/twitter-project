import { Schema, model } from "mongoose";
import UserDocument, { Role } from '../../../types/user.type'

const userSchema = new Schema<UserDocument>({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  loction:{
    type: String,
  },
  image:{
    type: String,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    required: true
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const User = model<UserDocument>("User", userSchema);
export default User;