import React, { useState } from 'react';
import "./AddStickywall.css"
import { useFormik } from 'formik';
import { HexColorPicker } from 'react-colorful';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { createStickyWall } from '../../State/stickyWall/Action';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['link', 'image'],
        ['clean'],
    ],
};

const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'align',
    'color', 'background', 'link', 'image'
];
const AddStickywall: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const navigate = useNavigate()
    const [color, setColor] = useState("");
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            color_code: ""
        },
        onSubmit: async (values) => {
            try {
                dispatch(createStickyWall(values));
                toast.success("StickyWall created successfully.");
                navigate(-1);
            } catch (error: any) {
                console.error("Error creating StickyWall:", error);
                toast.error(error.message || "Failed to create StickyWall.");
            }
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
                    <div className='mt-3 add-stickywall-content'>
                        <ReactQuill
                            theme="snow"
                            value={formik.values.description}
                            onChange={(content) => formik.setFieldValue("description", content)}
                            modules={quillModules}
                            formats={quillFormats}
                            className="add-stickywall-description border-radius-5 font-size"
                            placeholder="Description"
                        />
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
                    <div className="d-flex justify-content-end">
                        <button type="button" className="cancel-btn mt-3 border-radius-5">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn mt-3 ml-2 border-radius-5">
                            Add
                        </button>
                    </div>
                </form>
                <div>
                </div>
            </div>
        </div>
    )
}
export default AddStickywall;