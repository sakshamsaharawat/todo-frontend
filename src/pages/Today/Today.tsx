import React from 'react';
import './Today.css';
import { TextField } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { todoData } from '../../data/todoData';

const Today: React.FC = () => {
    return (
        <div className='today-main'>
             <section style={{ paddingLeft: '20px', paddingRight: "20px", borderRadius: '10px' }}>
         <div style={{display: 'flex', alignItems:'center'}}>
         <h1 className='today-main-title'>Today</h1>
         <div className='today-notification'>5</div>
         </div>
          <div className="box">
            <TextField fullWidth label="+ Add New Task" id="add-new-task"
              style={{ fontSize: '13px' }} />
          </div>
          {todoData.map((item) => (
            <div className='today-todo-list-container' style={{ border: "2px solid red"}}>
              <div className='today-todo-content'>
                <div className='today-todo-sub-content'>
                  <div style={{display: 'flex'}}>
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
              <div className='today-todo-text'>
                <div style={{ marginTop: "5px", display: 'flex', alignItems: 'center' }}>
                  {item?.date && <div className='today-todo-option'>
                    <CalendarMonthIcon style={{ height: '15px' }} />
                    <p>{item.date}</p>
                  </div>}
                  {item?.list_subtasks && <div className='today-todo-option'>
                    <span style={{ backgroundColor: 'whitesmoke', height: "12px", width: "18px", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.list_subtasks.task}</span>
                    <span style={{ marginLeft: '5px' }}>{item.list_subtasks.task_title}</span>
                  </div>}
                  {item.list_type && <div className='today-todo-option'>
                    <span style={{ backgroundColor: item.list_type.color_code, height: "12px", width: "12px", borderRadius: "3px" }}></span>
                    <span style={{ marginLeft: "5px" }}>{item.list_type.title}</span>
                  </div>}
                </div>
              </div>
            </div>
          ))}
        </section>
        </div>
    )
}

export default Today
