import * as Yup from "yup";

const UpdateTaskValidation = Yup.object().shape({
    title: Yup.string()
        .required("Title is required")
        .matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/, "Title cannot have consecutive spaces.")
        .min(3, "Title must be at least 3 characters"),

    description: Yup.string()
        .required("Description is required")
        .matches(/^(?!.*\s{2,})[A-Za-z0-9.,'-]+(?: [A-Za-z0-9.,'-]+)*$/, "Description cannot have consecutive spaces."),

    due_date: Yup.date()
        .required("Date is required")
        .typeError("Invalid date format"),
        // .min(new Date(new Date().setHours(0, 0, 0, 0)), "Due date cannot be in the past"),

    tag_ids: Yup.array()
        .of(Yup.string().matches(/^[0-9a-fA-F]{24}$/, "Each tag ID must be a valid MongoDB ObjectId"))
        .optional(),

    list_id: Yup.string()
        .optional()
        .matches(/^[0-9a-fA-F]{24}$/, "List ID must be a valid MongoDB ObjectId"),
});

export default UpdateTaskValidation;
