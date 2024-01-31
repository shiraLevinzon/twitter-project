import User from "../db/User.model";
import UserDocument from "../../../types/user.type";

export const getUsers = async (): Promise<Array<UserDocument>> => await User.find().populate("followers");
export const getUserByEmail = async (email: string): Promise<UserDocument> => await User.findOne({ email }).populate("followers");
export const getUserById = async (id: string): Promise<UserDocument> => await User.findOne({ _id: id }).populate("followers");

export const addUser = async (body: Body): Promise<UserDocument> => {
  const newUser = new User(body);
  await newUser.save();
  return newUser.populate("followers");
};
export const updateFollow = async (userId: string, newFollow: string) : Promise<UserDocument> => {
  const update = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { followers: newFollow } },
    { new: true }
  );
  return update;
}
export const updateUnfollow = async (userId: string, newUnfollow: string) : Promise<UserDocument> => {
  const update = await User.findOneAndUpdate(
    { _id: userId, followers: { $in: [newUnfollow] } },
    { $pull: { followers: newUnfollow } },
    { new: true }
  );
  return update;
}
export const updateRoll = async (userId: string, newRole: string) : Promise<UserDocument> => {
  const update = await User.findOneAndUpdate(
    { _id: userId },
    { role: newRole },
    { new: true }
  );
  return update;
}
