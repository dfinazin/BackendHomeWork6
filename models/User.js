import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Почта обязательна для заполнения"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Указан некорректный адрес почты",
      },
    },
    password: {
      type: String,
      required: [true, "Пароль обязателен для заполнения"],
      validate: [
        {
          validator: function (volume) {
            return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/.test(
              volume
            );
          },
          message:
            "Пароль должен содержать минимум одну букву, одну цифру и один специальный символ",
        },
        {
          validator: function (volume) {
            return volume && volume.length >= 8;
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
