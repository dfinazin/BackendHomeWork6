import { generateTocken } from "../helpers/token.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

// register (adduser)
export const addUser = async (login, password) => {
  const user = new User({ email: login, password: password });
  await user.save();
  return user;
};
// login

export const loginUser = async (login, password) => {
  const user = await User.findOne({ email: login });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }
  const tocken = generateTocken({ id: user.id });
  return { tocken, user };
};

// logout Отдельный контроллер не требуется

// delete

// edit
