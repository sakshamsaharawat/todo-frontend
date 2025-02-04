import * as Yup from 'yup';

export const AddTaskValidation = Yup.object({
    title: Yup.string()
        .required("Title is required")
        .matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/, "Title cannot have consecutive spaces.")
        .min(3, "Title must be at least 3 characters"),

    description: Yup.string()
        .required("Description is required")
        .matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/, "Description cannot have consecutive spaces."),

    list: Yup.array()
        .min(1, "At least one tag is required")
        .required("Tags are required"),

    tag: Yup.array()
        .min(1, "At least one tag is required")
        .required("Tags are required"),

    date: Yup.date()
        .required("Date is required")
        .nullable()
        .typeError("Invalid date format"),
});
