import { Note } from "../models/Note.js";

export const addNote = async (fullName, phone, description) => {
  await Note.create({
    full_name: fullName,
    phone: phone,
    description: description,
  });
};
