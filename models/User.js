import mongoose from "mongoose";
import validator from "validator";
import * as roles from "../constants/roles.js";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Почта обязательна для заполнения"],
      unique: [
        true,
        "Учетная запись оператора с указанной почтой уже существует",
      ],
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
          message: "Минимальная длина пароля - 8 символов",
        },
      ],
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.OPERATOR,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

export const User = mongoose.model("User", userSchema);
