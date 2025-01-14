import React from 'react';
import './Upcoming.css';
import { Box, TextField } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { todoData } from '../../data/todoData';


const Upcoming: React.FC = () => {
  console.log("data---", todoData)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 className='main-title'>Upcoming</h1>
        <div className='upcoming-notification'>12</div>
      </div>
      <div className="main-container">
        <section style={{ border: "2px solid whitesmoke", paddingLeft: '20px', paddingRight: "20px", borderRadius: '10px' }}>
          <h3 style={{ marginTop: '15px' }}>Today</h3>
          <Box className="box">
            <TextField fullWidth label="+ Add New Task" id="add-new-task"
              style={{ fontSize: '13px' }} />
          </Box>
          {todoData.map((item) => (
            <div className='todo-list-container'>
              <div className='todo-content'>
                <div className='todo-sub-content'>
                  <div>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <p>{item?.title}</p>
                  </div>
                </div>
                <div>
                  <ArrowForwardIosIcon style={{ height: "15px" }} />
                </div>
              </div>
              <div className='todo-text'>
                <div style={{ marginTop: "5px" }}>
                  {item?.date && <div className='todo-option'>
                    <CalendarMonthIcon style={{ height: '15px' }} />
                    <p>{item.date}</p>
                  </div>}
                  {item?.list_subtasks && <div className='todo-option'>
                    <span style={{ backgroundColor: 'whitesmoke', height: "12px", width: "18px", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.list_subtasks.task}</span>
                    <span style={{ marginLeft: '5px' }}>{item.list_subtasks.task_title}</span>
                  </div>}
                  {item.list_type && <div className='todo-option'>
                    <span style={{ backgroundColor: item.list_type.color_code, height: "12px", width: "12px", borderRadius: "3px" }}></span>
                    <span style={{ marginLeft: "5px" }}>{item.list_type.title}</span>
                  </div>}
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className='sub-todo-list-container'>
          <section style={{ width: "50%", border: "2px solid whitesmoke", padding: "20px" }} className='todo-list-container' >
            <h3>Tomorrow</h3>
            <Box className="box">
              <TextField fullWidth label=" + Add New Task" id="add-new-task" />
            </Box>
            {todoData.map((item) => (
              <div className='todo-list-container'>
                <div className='todo-content'>
                  <div className='todo-sub-content'>
                    <div>
                      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                      <p>{item.title}</p>
                    </div>
                  </div>
                  <div>
                    <ArrowForwardIosIcon style={{ height: "15px" }} />
                  </div>
                </div>
              </div>
            ))}
          </section>
          <section style={{ width: "50%", border: "2px solid whitesmoke", padding: "20px" }} className='todo-list-container'>
            <h3>This Week</h3>
            <Box className="box">
              <TextField fullWidth label="Add New Task" id="add-new-task" />
            </Box>
            {todoData.map((item) => (
              <div className='todo-list-container'>
                <div className='todo-content'>
                  <div className='todo-sub-content'>
                    <div>
                      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                      <p>{item.title}</p>
                    </div>
                  </div>
                  <div>
                    <ArrowForwardIosIcon style={{ height: "15px" }} />
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
