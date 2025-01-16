import React from 'react';
import './Upcoming.css';
import { Box, TextField } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { todoData } from '../../data/todoData';


const Upcoming: React.FC = () => {
  return (
    <div className='upcoming-main-component'>
      <div className="upcoming-main-title">
        <h1 className='main-heading'>Upcoming</h1>
        <div className='upcoming-notification'>12</div>
      </div>
      <div className="main-container">
        <section className='today-main-section'>
          <h3 className='todo-heading'>Today</h3>
          <div className="today-add-input">
            <TextField fullWidth label="+ Add New Task" id="add-new-task" />
          </div>
          {todoData.map((item) => (
            <div className='today-main-todo'>
              <div className='todo-content'>
                <div className='todo-sub-content'>
                  <div className='todo-checkbox'>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                  </div>
                  <div className='today-content-title'>
                    <p>{item?.title}</p>
                  </div>
                </div>
                <div>
                  <ArrowForwardIosIcon className='todo-icon' />
                </div>
              </div>
              <div>
                <div className='todo-main-list'>
                  {item?.date && <div className='todo-option'>
                    <CalendarMonthIcon className='todo-icon' />
                    <p>{item.date}</p>
                  </div>}
                  {item?.list_subtasks && <div className='todo-option'>
                    <span className='todo-option-substask-task'>
                      {item.list_subtasks.task}</span>
                    <span className='todo-option-substask-list-title'>{item.list_subtasks.task_title}</span>
                  </div>}
                  {item.list_type && <div className='todo-option'>
                    <span className='todo-option-substask-list' style={{ backgroundColor: item.list_type.color_code }}></span>
                    <span className='todo-option-substask-list-title'>{item.list_type.title}</span>
                  </div>}
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className='today-sub-section'>
          <section className='this-weak-tomoarrow-container' >
            <h3 className='todo-heading'>Tomorrow</h3>
            <div>
              <TextField fullWidth label=" + Add New Task" id="add-new-task" />
            </div>
            {todoData.map((item) => (
              <div className='today-main-todo'>
                <div className='todo-content'>
                  <div className='todo-sub-content'>
                    <div>
                      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    </div>
                    <div className='today-content-title'>
                      <p>{item.title}</p>
                    </div>
                  </div>
                  <div >
                    <ArrowForwardIosIcon className='todo-icon' />
                  </div>
                </div>
              </div>
            ))}
          </section>
          <section className='this-weak-tomoarrow-container'>
            <h3 className='todo-heading'>This Week</h3>
            <Box className="box">
              <TextField fullWidth label="Add New Task" id="add-new-task" />
            </Box>
            {todoData.map((item) => (
              <div className='today-main-todo'>
                <div className='todo-content'>
                  <div className='todo-sub-content'>
                    <div>
                      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    </div>
                    <div className='today-content-title'>
                      <p>{item.title}</p>
                    </div>
                  </div>
                  <div>
                    <ArrowForwardIosIcon className='todo-icon' />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </section>
      </div>
    </div>
  )
}

export default Upcoming
