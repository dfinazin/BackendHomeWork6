import { Note } from "../models/Note.js";

// addNote

export const addNote = async (fullName, phone, description) => {
  await Note.create({
    full_name: fullName,
    phone: phone,
    description: description,
  });
};

// getNotes

export const getNotes = async () => await Note.find();
