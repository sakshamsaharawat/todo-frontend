import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import './Task.css';
import { TodoItem } from '../../types/types-todo';
import { Modal } from '@mui/material';
import AddTask from '../AddTask/AddTask';

type TaskDrawerProps = {
  isOpen: boolean;
  toggleDrawer: (isOpen: boolean) => void;
  taskDetails: TodoItem;
};

const TaskDrawer: React.FC<TaskDrawerProps> = ({ isOpen, toggleDrawer, taskDetails }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
      <div
        className="main-task p-3 navbar-background-color "
      >
        <div className="d-flex align-item-center justify-content-space-between p-1">
          <h3 className="heading-color">Task Details:</h3>
          <CloseIcon
            className='cursor-pointer'
            onClick={() => toggleDrawer(false)}
          />
        </div>
        <input className="task-input mt-1 border-radius-5" type='text' value={taskDetails?.title} />
        <textarea className='task-description p-1 mt-2 border-radius-5 font-size'
          placeholder='Description' value={taskDetails?.description} />
        <div className='mt-2 font-size'>
          <label className='task-list'>List</label>
          <select className='font-size cursor-pointer border-radius-5'
            name="list"
            id="list"
            value={selectedValue}
            onChange={handleChange}
          >
            <option value={taskDetails?.list_type?.title} label={taskDetails?.list_type?.title}></option>
            <option value="work">Work</option>
            <option value="list">List</option>
          </select>
          <div className='task-content mt-1'>
            <label className='mr-5'>Due date</label>
            <select className='font-size cursor-pointer border-radius-5'
              name="duedate"
              id="date"
              value={selectedValue}
              onChange={handleChange}
            >
              <option value={taskDetails?.date}>{taskDetails?.date}</option>
              <option value="16-01-25">16-01-25</option>
              <option value="26-01-25">26-01-25</option>
            </select>
          </div>
        </div>
        <div className='task-tags d-flex mt-2 font-size'>
          <p>Tags</p>
          <div className='sub-task-tags d-flex f-wrap'>
            {taskDetails?.tag?.map((tag, index) => (
              <span key={index} className='tag mr-1 font-size border-radius-5 mb-1'
                style={{ backgroundColor: tag?.color_code }}
              >
                {tag?.tag_title}</span>
            ))}
            <span className='add-task-tags ml-1 border-radius-5 d-flex align-item-center'> + Add Tag</span>
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
        <div className='task-footer d-flex'>
          <button type="button" className='delete-task-btn border-radius-5'>
            Delete Task
          </button>
          <button type="button" className='change-task-btn border-radius-5'>
            Save changes
          </button>
        </div>
      </div>
    </Drawer>
  );
}
export default TaskDrawer;
