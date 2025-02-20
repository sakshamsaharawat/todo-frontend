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
      try {
        const result = await dispatch(CreateList(values));
        if (result.success) {
          toast.success("List created successfully.")
          closeModal();
        } else {
          toast.error(result.message);

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
      } catch (error: any) {
        console.error("Unexpected error during List creation:", error);
        toast.error("An unexpected error occurred. Please try again later.");
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
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
            <button onClick={() => closeModal()} className="cancel-btn list-btn mt-3 border-radius-5">
              Cancel
            </button>
            <button type="submit" className="list-btn submit-btn mt-3 border-radius-5">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddList;
