import { Note } from "../models/Note.js";
import * as NOTES from "../constants/notes.js";

// addNote

export const addNote = async (fullName, phone, description) => {
  await Note.create({
    full_name: fullName,
    phone: phone,
    description: description,
  });
};

// getNotes

export const getNotes = async (
  search = "",
  limit = NOTES.NOTES_PAGE_LIMIT,
  page = 1,
) => {
  const [notes, count] = await Promise.all([
    Note.find({
      $or: [
        { full_name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Note.countDocuments({
      $or: [
        { full_name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    }),
  ]);
  return {
    notes: notes,
    lastPage: Math.ceil(count / limit),
  };
};
