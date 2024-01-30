import User from "../db/User.model";

export const getUsers = async () => await User.find().populate("followers");
export const getUserByEmail = async (email: string) =>await User.findOne({ email }).populate("followers");
export const getUserById = async (id: string) =>await User.findOne({ _id: id }).populate("followers");

export const addUser = async (body: Body) => {
  const newUser = new User(body);
  await newUser.save();
  return newUser.populate("followers");
};
export const updateFollow = async (userId: string, newFollow: string) => {
  const update = await User.updateOne(
    { _id: userId },
    { $addToSet: { followers: newFollow } }
  );
  return update;
}
export const updateUnfollow = async (userId: string, newUnfollow: string) => {  
  const update = await User.updateOne({ _id: userId, followers: { $in: [newUnfollow] }  }, { $pull: { followers: newUnfollow } })
  return update;
}
export const updateRoll = async (userId: string, newRole: string) => {
  const update = await User.updateOne(
    { _id: userId },
    { role: newRole }
  );
  return update;
}
