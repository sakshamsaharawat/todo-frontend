import React from 'react';
import './Upcoming.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { todoData } from '../../data/todoData';

const Upcoming: React.FC = () => {
  return (
    <div className='upcoming-main-component'>
      <div className="d-flex align-item-center mt-2">
        <h1 className='main-heading-color ml-4'>Upcoming</h1>
        <div className='upcoming-notification d-flex justify-content-center mt-1 border-radius-5 b-ws heading-color'>12</div>
      </div>
      <div className="mt-6">
        <section className='today-main-section ml-3 p-4'>
          <div>
            <h3 className='heading-color'>Today</h3>
            <div>
              <input placeholder="+ Add New Task" id="add-new-task" className="today-add-input mt-2 font-size" />
            </div>
          </div>
          {todoData.map((item) => (
            <div className='align-item-center justify-content-center b-bottom-ws f-wrap font-size'>
              <div className='d-flex align-item-center justify-content-space-between mt-2'>
                <div className='d-flex ml-4'>
                  <div className='d-flex'>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                  </div>
                  <div className='ml-4'>
                    <p>{item?.title}</p>
                  </div>
                </div>
                <div>
                  <ArrowForwardIosIcon className='todo-icon' />
                </div>
              </div>
              <div>
                <div className='todo-main-list d-flex align-item-center mb-2'>
                  {item?.date && <div className='d-flex align-item-center'>
                    <CalendarMonthIcon className='todo-icon' />
                    <p>{item.date}</p>
                  </div>}
                  {item?.list_subtasks && <div className='d-flex align-item-center ml-2 mr-1'>
                    <span className='todo-option-substask-task d-flex align-item-center justify-content-center'>
                      {item.list_subtasks.task}</span>
                    <span className='ml-1'>{item.list_subtasks.task_title}</span>
                  </div>}
                  {item?.list_type && <div className='d-flex align-item-center ml-1'>
                    <span className='todo-option-substask-list' style={{ backgroundColor: item.list_type.color_code }}></span>
                    <span className='ml-1'>{item.list_type.title}</span>
                  </div>}
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className='today-sub-section d-flex mt-3'>
          <section className='this-week-tomoarrow-container cursor-pointer'>
            <div className='p-4'>
              <div className='today-sub-section-title'>
                <h3 className='sub-heading-color'>Tomorrow</h3>
                <div>
                  <input placeholder="+ Add New Task" id="add-new-task" className='today-add-input' />
                </div>
              </div>
              <div className='upcoming-main-content'>
                {todoData.map((item) => (
                  <div className='align-item-center justify-content-center b-bottom-ws f-wrap font-size'>
                    <div className='d-flex align-item-center justify-content-space-between mt-2'>
                      <div className='d-flex ml-3 mb-2'>
                        <div className='d-flex'>
                          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                        </div>
                        <div className='ml-4'>
                          <p>{item.title}</p>
                        </div>
                      </div>
                      <div >
                        <ArrowForwardIosIcon className='todo-icon' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className='this-week-tomoarrow-container cursor-pointer'>
            <div className='p-4 border'>
              <div className='today-sub-section-title'>
                <h3 className='sub-heading-color'>This Week</h3>
                <div className="box">
                  <input placeholder="+ Add New Task" id="add-new-task" className='today-add-input' />
                </div>
              </div>
              <div className='upcoming-main-content'>
                {todoData.map((item) => (
                  <div className='align-item-center justify-content-center b-bottom-ws f-wrap font-size'>
                    <div className='d-flex align-item-center justify-content-space-between mt-2'>
                      <div className='d-flex ml-3 mb-2'>
                        <div className='d-flex'>
                          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                        </div>
                        <div className='ml-4'>
                          <p>{item?.title}</p>
                        </div>
                      </div>
                      <div>
                        <ArrowForwardIosIcon className='todo-icon' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default Upcoming
