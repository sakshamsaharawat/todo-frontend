import * as Yup from "yup";

export const AddTagValidation = Yup.object({
    title: Yup.string()
        .required("Title is required")
        .matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/, "Title cannot have consecutive spaces.")
        .min(2, "Title must be at least 2 characters"),
    color_code: Yup.string()
        .required("color_code is required")
        .matches(/^\S*$/, "color_code cannot contain spaces.")
        .min(3, "color_code must be at least 3 characters'"),
})