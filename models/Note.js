import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Note = mongoose.model("Note", NoteSchema);
