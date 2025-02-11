import React from 'react';
import { AddTaskValidation } from '../../validations/Add-task.validate';
import { useFormik } from 'formik';
import "./AddTask.css"
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { createTask } from '../../State/AddTask/Action';
import { toast } from 'react-toastify';
import { TaskData } from '../../State/AddTask/interface/create-task.interface';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';
import { TagItem } from '../../State/Tag/interface/get-tag.interface';

const AddTask: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const { listReducer } = useSelector((store: RootState) => store);
    const { tagReducer } = useSelector((store: RootState) => store);
    const navigate = useNavigate();
    const todayIst = new Date()
    console.log("todayIst---", todayIst)

    const formik = useFormik<TaskData>({
        initialValues: {
            title: "",
            description: "",
            due_date: "",
            tag_ids: [],
            list_id: "",
            tags: []
        },
        // validationSchema: AddTaskValidation,
        onSubmit: async (values) => {
            console.log("Values", values);
            dispatch(createTask(values))
            toast.success("Task Created successfully.")
            navigate(-1)
            //    try {
            //            const result = await dispatch(createTask(values));
            //            if (result.success) {
            //              toast.success("List created successfully.")

            //            } else {
            //              console.log("backend-error",result.message)
            //             toast.error(result.message);
            // }
        }
    });
    const handleDelete = (item: TagItem): void => {
        formik.setFieldValue("tag_ids", formik.values.tag_ids.filter(tag => tag !== item._id));
    };
    return (
        <div>
            <div className='mt-2'>
                <h1 className='heading-color pl-2'>Add New Task</h1>
            </div>
            <div className='main-add-task p-2'>
                <form onSubmit={formik.handleSubmit} className='add-task-form p-5 b-ws border-radius-10'>
                    <div>
                        <input
                            type='text'
                            name='title'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            placeholder='Enter title here'
                            className='add-task-input width-full mt-2'
                        />
                    </div>
                    <div>
                        <textarea className="add-task-description p-1 mt-2 border-radius-5 font-size"
                            name="description"
                            placeholder='Description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        >
                        </textarea>
                    </div>
                    <div className='mt-1'>
                        <label>Due date</label>
                        <input
                            className='add-date font-size cursor-pointer border-radius-5 ml-5'
                            type='date'
                            name="due_date"
                            value={formik.values.due_date}
                            min={todayIst.toISOString().split("T")[0]}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='mt-3'>
                        <label className='task-list'>List</label>
                        <select
                            className='add-list font-size cursor-pointer border-radius-5'
                            name="list_id"
                            id="list"
                            value={formik.values.list_id}
                            onChange={(e) => {
                                const selectedListId = e.target.value;
                                formik.setFieldValue("list_id", selectedListId);
                            }}
                        >
                            {listReducer?.lists.map((item) => (
                                <option
                                    key={item._id}
                                    value={item._id} // Store the _id in the value of the option
                                    label={item.title} // Show the title on UI
                                />
                            ))}
                        </select>
                    </div>
                    <div className='mt-5'>
                        <div className='d-flex'>
                            <label className=''>Tags</label>
                            <div className="tag-add-task d-flex p-2">
                                {tagReducer?.tags.map((item) => (
                                    <Chip
                                        label={item.title}
                                        onDelete={formik.values.tag_ids.includes(item._id) ? () => handleDelete(item) : undefined}
                                        variant="outlined"
                                        key={item._id}
                                        onClick={() => {
                                            formik.setFieldValue("tag_ids", [...formik.values.tag_ids, item._id]);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end mt-5'>
                        <button className='cancel-btn border-radius-5' type='button'>Cancel</button>
                        <button className='submit-btn border-radius-5 ml-2' type="submit">Save</button>
                    </div>
                </form>

                <div>
                </div>
            </div>
        </div>
    )
}

export default AddTask;
