import mongoose from "mongoose";
//import moduleName from "validator";

const NoteSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "ФИО обязательно для заполнения"],
      validate: {
        validator: function (v) {
          return /^[А-ЯЁа-яё]+(-[А-ЯЁа-яё]+)*\s+[А-ЯЁа-яё]+\s*([А-ЯЁа-яё]+)?$/.test(
            v.trim()
          );
        },
        message: "Укажите Фамилию, Имя и Отчество(при наличии).",
      },
    },
    phone: {
      type: String,
      required: [true, "Номер телефона обязателен для заполнения"],
      validate: {
        validator: function (value) {
          // Проверяем, что строка состоит только из цифр
          return (
            /^\d+$/.test(value) &&
            value.length === 11 &&
            value >= "80000000000" &&
            value <= "89999999999"
          );
        },
        message:
          "Требуется указать полностью 11-значный номер телефона в формате 8XXXXXXXXXX",
      },
    },
    description: {
      type: String,
      required: [true, "Описание проблемы обязателльно для заполнения"],
      validate: {
        validator: function (value) {
          return value.length < 600;
        },
        message: "Максимальная длина описания 600 символов",
      },
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", NoteSchema);
