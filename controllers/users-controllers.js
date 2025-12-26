import { User } from "../models/User.js";

// register (adduser)
export const addUser = async (login, password) => {
  const user = new User({ email: login, password: password });
  await user.save();
  return user;
};
// login

// logout

// delete

// edit
