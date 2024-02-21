import User from "../db/User.model";
import UserDocument from "../../../types/user.type";
import bcrypt from 'bcrypt';

export const getUsers = async (): Promise<Array<UserDocument>> => await User.find().populate("followers");
export const getUserByEmail = async (email: string): Promise<UserDocument> => await User.findOne({ email });
export const getUserById = async (id: string): Promise<UserDocument> => await User.findOne({ _id: id }).populate("followers");

export const addUser = async (body: UserDocument): Promise<UserDocument> => {
  const hash : string = await bcrypt.hash(body.password, 10);
  const newUser : UserDocument = new User({...body, password: hash});
  await newUser.save();
  return newUser.populate("followers");
};
export const updateFollow = async (userId: string, newFollow: string) : Promise<UserDocument> => {
  const update : UserDocument = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { followers: newFollow } },
    { new: true }
  );
  return update;
}
export const updateUnfollow = async (userId: string, newUnfollow: string) : Promise<UserDocument> => {
  const update :UserDocument = await User.findOneAndUpdate(
    { _id: userId, followers: { $in: [newUnfollow] } },
    { $pull: { followers: newUnfollow } },
    { new: true }
  );
  return update;
}
export const updateRoll = async (userId: string, newRole: string) : Promise<UserDocument> => {
  const update : UserDocument = await User.findOneAndUpdate(
    { _id: userId },
    { role: newRole },
    { new: true }
  );
  return update;
}
