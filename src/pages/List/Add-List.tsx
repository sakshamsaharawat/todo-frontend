import React, { useState } from "react";
import "./Add-List.css";
import { useFormik } from "formik";
import { AddListValidation } from "../../validations/Add-List.validate";
import { HexColorPicker } from "react-colorful";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { CreateList, getList } from "../../State/List/Action";
import { toast } from 'react-toastify';
import { AddListProps } from "./interface/list.interface";
import { useNavigate } from "react-router-dom";

const AddList: React.FC<AddListProps> = ({ closeModal }) => {
  const { listReducer } = useSelector((store: RootState) => store);
  console.log("listReducer---addlist", listReducer)
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const [color, setColor] = useState("");
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      title: "",
      color_code: color,
    },
    validationSchema: AddListValidation,
    onSubmit: async (values) => {
      console.log("Values", values);
      try {
        const result = await dispatch(CreateList(values));
        if (result.success) {
          toast.success("List created successfully.")
          closeModal();
          dispatch(getList());

        } else {
          console.log("List creation failed:", result.message);

          if (result.isAuthError) {
            toast.error(result.message);
            navigate("/login");
          }
          else if (result.message.includes("List already exists")) {
            toast.error("This List already exists. Please use a different name.");
          }
          else {
            toast.error(result.message || "List creation failed. Please try again.");
          }
        }
      } catch (error) {
        console.error("Unexpected error during List creation:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    },
  });

  return (
    <div>
      <h1 className="heading-color d-flex align-item-center justify-content-center">Add New List</h1>
      <div className="d-flex justify-content-center align-item-center">
        <form onSubmit={formik.handleSubmit} className="width-60">
          <div>
            <input
              name="title"
              type="text"
              placeholder="Enter your title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="add-list-input width-full mt-3 border-radius-5 p-2 b-ws"
            />
            {formik.touched.title && formik.errors.title && (
              <span className="text-error">{formik.errors.title}</span>
            )}
          </div>

          <div className="mt-3">
            <HexColorPicker
              className="color-picker"
              color={formik.values.color_code}
              onChange={(newColor) => {
                setColor(newColor);
                formik.setFieldValue("color_code", newColor);
              }}
            />
          </div>

          <div>
            <input
              name="color_code"
              type="text"
              placeholder="Enter your color code"
              value={formik.values.color_code}
              onChange={formik.handleChange}
              className="add-list-input width-full mt-3 border-radius-5 p-2 b-ws"
            />
            {formik.touched.color_code && formik.errors.color_code && (
              <span className="text-error">{formik.errors.color_code}</span>
            )}
          </div>
          <div className="d-flex justify-content-space-between">
            <button type="submit" className="list-btn mt-3 p-2">
              Add
            </button>
            <button type="submit" className="list-btn mt-3 p-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddList;
