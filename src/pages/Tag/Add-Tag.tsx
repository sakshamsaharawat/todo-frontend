import React, { useState } from 'react';
import { useFormik } from 'formik';
import { AddTagValidation } from '../../validations/Add-Tag.validate';
import { createTag, getTag } from '../../State/Tag/Action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { HexColorPicker } from 'react-colorful';
import { AddTagProps } from './interface/tag.interface';
import './Add-Tag.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getList } from '../../State/List/Action';

const AddTag: React.FC<AddTagProps> = ({ closeModal }) => {
  const { tagReducer } = useSelector((store: RootState) => store);
  const { listReducer } = useSelector((store: RootState) => store);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const navigate = useNavigate()
  const [color, setColor] = useState("")

  const formik = useFormik({
    initialValues: {
      title: "",
      color_code: color
    },
    validationSchema: AddTagValidation,
    onSubmit: async (values) => {
      try {
        const result = await dispatch(createTag(values));
        if (result.success) {
          toast.success("Tag created successfully.");
          dispatch(getTag());
          dispatch(getList())
          closeModal();
        } else {
          console.log("Tag creation failed:", result.message);

          if (result.isAuthError) {
            toast.error(result.message);
            navigate("/login");
          }
          else if (result.message.includes("Tag already exists")) {
            toast.error("This tag already exists. Please use a different name.");
          }
          else {
            toast.error(result.message || "Tag creation failed. Please try again.");
          }
        }
      } catch (error) {
        console.error("Unexpected error during tag creation:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    },
  });

  return (

    <div>
      <h1 className='heading-color d-flex align-item-center justify-content-center'>Add New Tag</h1>
      <div className='d-flex align-item-center justify-content-center'>
        <form onSubmit={formik.handleSubmit} className='width-60'>
          <div>
            <input
              type='text'
              name='title'
              placeholder='Enter Tag here'
              value={formik.values.title}
              onChange={formik.handleChange}
              className='add-tag-input width-full mt-3 border-radius-5 p-2 b-ws'
            />
            {formik.touched.title && formik.errors.title && (
              <span className="text-error">{formik.errors.title}</span>
            )}
          </div>
          <div className='mt-2 '>
            <HexColorPicker
              className='color-picker'
              color={formik.values.color_code}
              onChange={(newColor) => {
                setColor(newColor);
                formik.setFieldValue("color_code", newColor)
              }}
            />
          </div>
          <div>
            <input
              type='text'
              name='color_code'
              value={formik.values.color_code}
              onChange={formik.handleChange}
              className='add-tag-input width-full mt-3 border-radius-5 p-2 b-ws'
            />
            {formik.touched.color_code && formik.errors.color_code && (
              <span className="text-error">{formik.errors.color_code}</span>
            )}
          </div>
          <div className="d-flex justify-content-space-between">
            <button type="button" onClick={() => closeModal()} className="tag-btn mt-3 p-2">
              Cancel
            </button>
            <button type="submit" className="tag-btn mt-3 p-2">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTag;
