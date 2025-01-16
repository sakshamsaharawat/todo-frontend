import React, { useState } from 'react';
import './Today.css';
import { TextField } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { todoData } from '../../data/todoData';
import TaskDrawer from '../Task/Task';

const Today: React.FC = () => {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenTask = (task: any) => {
    setSelectedTask(task);
    setIsTaskDrawerOpen(true);
  };

  const toggleDrawer = (isOpen: boolean) => {
    setIsTaskDrawerOpen(isOpen);
    if (!isOpen) setSelectedTask(null);
  };
  return (
    <div className='today-main-component'>
      <div className='d-flex align-item-center'>
        <h1 className='today-main-title'>Today</h1>
        <div className='today-notification'>5</div>
      </div>
      <div className='today-main'>
        <section className='today-section'>
          <div className="box">
            <TextField fullWidth label="+ Add New Task" id="add-new-task" />
          </div>
          {todoData.map((item) => (
            <div className='today-todo-list-container'
            onClick={() => handleOpenTask(item)}
            >
              <div className='today-todo-content'>
                <div className='today-todo-sub-content'>
                  <div className='d-flex'>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                  </div>
                  <div>
                    <p>{item?.title}</p>
                  </div>
                </div>
                <div>
                  <ArrowForwardIosIcon className='todo-icon' />
                </div>
              </div>
              <div className='today-main-list'>
                <div className='today-main-list-title align-item-center d-flex'>
                  {item?.date && <div className='today-todo-option'>
                    <CalendarMonthIcon className='todo-icon' />
                    <p>{item.date}</p>
                  </div>}
                  {item?.list_subtasks && <div className='today-todo-option'>
                    <span className='today-todo-option-task'></span>
                    <span className='today-main-list-sub-title'>{item.list_subtasks.task_title}</span>
                  </div>}
                  {item.list_type && <div className='today-todo-option'>
                    <span className='today-main-list-color-box' style={{ backgroundColor: item.list_type.color_code }}></span>
                    <span className='today-main-list-sub-title'>{item.list_type.title}</span>
                  </div>}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
      <TaskDrawer
        isOpen={isTaskDrawerOpen}
        toggleDrawer={toggleDrawer}
        taskDetails={selectedTask}
      />
    </div>
  )
}

export default Today
