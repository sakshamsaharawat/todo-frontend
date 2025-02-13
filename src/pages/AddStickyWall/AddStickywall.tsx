import React, { useState } from 'react';
import "./AddStickywall.css"
import { useFormik } from 'formik';
import { HexColorPicker } from 'react-colorful';
// import { AddStickywall } from './interface/Add-stickywall.interface';

const AddStickywall: React.FC = () => {
    const [color, setColor] = useState("");
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            color_code: ""
        },
        // validationSchema: AddTaskValidation,
        onSubmit: async (values) => {
            // try {
            // dispatch(createTask(values)); // Ensure the action resolves
            // toast.success("Task created successfully.");
            // navigate(-1);
            // } catch (error: any) {
            // console.error("Error creating task:", error);
            // toast.error(error.message || "Failed to create task.");
            // }
        },
    });

    return (
        <div>
            <div className='mt-2'>
                <h1 className='heading-color pl-2'>Add New Sticky Wall</h1>
            </div>
            <div className='main-add-task p-2'>
                <form onSubmit={formik.handleSubmit} className='p-5 b-ws border-radius-10'>
                    <div>
                        <input
                            type='text'
                            name='title'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            placeholder='Enter title here'
                            className='add-stickywall-input width-full mt-2'
                        />
                        {formik.touched.title && formik.errors.title && (
                            <span className='text-error'>{formik.errors.title}</span>
                        )}
                    </div>
                    <div>
                        <textarea className="add-stickywall-description p-1 mt-2 border-radius-5 font-size"
                            name="description"
                            placeholder='Description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        >
                        </textarea>
                        {formik.touched.description && formik.errors.description && (
                            <span className='text-error'>{formik.errors.description}</span>
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
                        <button className="submit-btn list-btn mt-3 border-radius-5">
                            Cancel
                        </button>
                        <button type="submit" className="list-btn submit-btn mt-3 border-radius-5">
                            Add
                        </button>
                    </div>
                </form>

                <div>
                </div>
            </div >
        </div >
    )
}
export default AddStickywall;
