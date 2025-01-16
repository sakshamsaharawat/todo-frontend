import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import './Task.css'


type TaskDrawerProps = {
  isOpen: boolean;
  toggleDrawer: (isOpen: boolean) => void;
  taskDetails?: any; // Update with your task details type
};

const TaskDrawer: React.FC<TaskDrawerProps> = ({ isOpen, toggleDrawer, taskDetails }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };



  return (
    <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
      <div
        className="main-task"
        style={{ width: "350px" }}
      >
        <div className="task-header">
          <h3 className="task-heading">Task Details:</h3>
          <CloseIcon
            style={{ cursor: 'pointer' }}
            onClick={() => toggleDrawer(false)}
          />
        </div>
        <input className="task-input" type='text' placeholder='Renew driver licence' />
        <textarea className='task-description' placeholder='Description' />
        <div className='task-content'>
          <label style={{ marginRight: "80px" }}>List</label>
          <select
            name="list"
            id="list"
            value={selectedValue}
            onChange={handleChange}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="list">List</option>
          </select>
          <div className='task-content'>
            <label style={{ marginRight: "47px", }}>Due date</label>
            <select
              name="duedate"
              id="date"
              value={selectedValue}
              onChange={handleChange}
            >
              <option value="01-01-25">01-01-25</option>
              <option value="16-01-25">16-01-25</option>
              <option value="26-01-25">26-01-25</option>
            </select>
          </div>
        </div>
        <div className='task-tags'>
          <p>Tags</p>
          <div className='sub-task-tags'>
            <span className='tag'>Tag 1</span>
            <span className='add-task-tags'> + Add Tag </span>
          </div>
        </div>
        <div className='main-subtask'>
          <h3 className='task-heading'>Subtasks:</h3>
          <div>
            <input className="subtask-input" type='text' placeholder='+ Add New Subtask' />
          </div>
          <div className='subtask-content'>
            <div className='d-flex'>
              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            </div>
            <div className='subtask-content-task'>
              <p> Substask</p>
            </div>
          </div>
        </div>
        <div className='task-footer'>
          <div className='delete-task-btn'>
            Delete Task
          </div>
          <div className='change-task-btn'>
            Save changes
          </div>
        </div>
      </div>
    </Drawer>
  );
}
export default TaskDrawer;
