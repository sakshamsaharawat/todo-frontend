import React, { useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import './Task.css';
import { deleteTask, updateTask } from '../../State/AddTask/Action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { UpdateTask } from './interface/update-task.interface';
import { useFormik } from 'formik';
import UpdateTaskValidation from '../../validations/update-task.validate';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Chip } from '@mui/material';
import { TagItem } from '../../State/Tag/interface/get-tag.interface';
import { TaskDrawerProps } from './type/task-drawer.type';

const TaskDrawer: React.FC<TaskDrawerProps> = ({ isOpen, toggleDrawer, taskDetails, type }) => {
  const { listReducer } = useSelector((store: RootState) => store);
  const { tagReducer } = useSelector((store: RootState) => store);

  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const formik = useFormik<UpdateTask>({
    initialValues: {
      title: "",
      description: "",
      due_date: "",
      tag_ids: [],
      list_id: "",
    },
    validationSchema: UpdateTaskValidation,
    onSubmit: async (values) => {
      try {
        dispatch(updateTask(values, taskDetails._id, type));
        toast.success("Task Updated successfully.");
        toggleDrawer(false)
      } catch (error: any) {
        console.error("Error updating task:", error);
        toast.error(error.message || "Failed to update task.");
      }
    },
  });
  const handleDelete = (item: TagItem): void => {
    formik.setFieldValue("tag_ids", formik.values.tag_ids.filter(tag => tag !== item._id));
  };
  const todayIst = new Date()

  useEffect(() => {
    if (taskDetails) {
      formik.setValues({
        title: taskDetails.title ?? "",
        description: taskDetails.description ?? "",
        due_date: taskDetails.due_date ?? "",
        tag_ids: taskDetails.tag_ids ?? [],
        list_id: taskDetails.list_id ?? "",
      });
    }
  }, [taskDetails]);

  const handleTaskDelete = async () => {
    try {
      await dispatch(deleteTask(taskDetails._id, type));
      toast.success("Task deleted successfully.");
      toggleDrawer(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete task.");
    }
  }
  const formatDateForInput = (date: any) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };
  return (
    <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
      <form onSubmit={formik.handleSubmit}>
        <div
          className="main-task p-3 navbar-background-color"
        >
          <div className="d-flex align-item-center justify-content-space-between p-1">
            <h3 className="heading-color">Task Details:</h3>
            <CloseIcon
              className='cursor-pointer'
              onClick={() => toggleDrawer(false)}
            />
          </div>
          <div>
            <input className="task-input mt-1 border-radius-5"
              type='text'
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title && (
              <span className='text-error'>{formik.errors.title}</span>
            )}
          </div>
          <div>
            <textarea className='task-description p-1 mt-2 border-radius-5 font-size'
              name='description'
              placeholder='Description'
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.touched.description && formik.errors.description && (
              <span className='text-error'>{formik.errors.description}</span>
            )}
          </div>
          <div className='mt-2 font-size'>
            <label className='task-list'>List</label>
            <select className='font-size cursor-pointer border-radius-5'
              name="list_id"
              id="list"
              value={formik.values.list_id || ""}
              onChange={(e) => {
                formik.setFieldValue("list_id", e.target.value);
              }}
            >
              {listReducer.lists.map((item) => (
                <option key={item._id} value={item._id}>{item?.title}</option>
              ))}
            </select>
            {formik.touched.list_id && formik.errors.list_id && (
              <span className='text-error'>{formik.errors.list_id}</span>
            )}
          </div>
          <div className='mt-2'>
            <label>Due date</label>
            <input
              className='task-date font-size cursor-pointer border-radius-5 ml-3'
              type='date'
              name="due_date"
              value={formatDateForInput(formik.values.due_date)}
              min={todayIst.toISOString().split("T")[0]}
              onChange={(e) => {
                formik.setFieldValue("due_date", e.target.value);
              }}
            />
            {formik.touched.due_date && formik.errors.due_date && (
              <span className='text-error'>{formik.errors.due_date}</span>
            )}
          </div>
          <div className='task-tags d-flex mt-2 font-size'>
            <p>Tags</p>
            <div className='sub-task-tags d-flex f-wrap'>
              {tagReducer?.tags.map((item: any) => (
                <Chip
                  label={item.title}
                  onDelete={formik.values.tag_ids.includes(item._id) ? () => handleDelete(item) : undefined}
                  variant="outlined"
                  key={item._id}
                  onClick={() => {
                    formik.setFieldValue("tag_ids", [...formik.values.tag_ids, item._id]);
                  }}
                  color={formik.values.tag_ids.includes(item._id) ? "primary" : "default"}
                />
              ))}
            </div>
          </div>
          <div className='mt-3'>
            <h3 className='heading-color'>Subtasks:</h3>
            <div>
              <input className="subtask-input ml-2 mt-1 font-size border-radius-5" type='text' placeholder='+ Add New Subtask' />
            </div>
            <div className='mt-2 ml-4 d-flex align-item-center font-size'>
              <div className='d-flex'>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
              </div>
              <div className='ml-4'>
                <p> Substask</p>
              </div>
            </div>
          </div>
          <div className='task-footer d-flex justify-content-end'>
            <button type="button" className='cancel-btn border-radius-5 width-full'
              onClick={() => handleTaskDelete()}
            >
              Delete Task
            </button>
            <button type="submit" className='submit-btn border-radius-5 width-full'>
              Save changes
            </button>
          </div>
        </div>
      </form>
    </Drawer>
  );
}
export default TaskDrawer;