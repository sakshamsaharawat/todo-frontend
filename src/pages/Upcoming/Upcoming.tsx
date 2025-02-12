import React, { useEffect } from 'react';
import './Upcoming.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { getTask } from '../../State/AddTask/Action';
import { useSelector } from 'react-redux';
import { GET_TODAY_PENDING_TASK_SUCCESS, GET_TOMORROW_TASK_SUCCESS, GET_WEEK_TASK_SUCCESS } from '../../State/AddTask/ActionTypes';
import { useNavigate } from 'react-router-dom';

const Upcoming: React.FC = () => {
  const navigate = useNavigate();
  const { taskReducer } = useSelector((store: RootState) => store);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getUTCDay();

    const startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0)).toISOString();
    const endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999)).toISOString();
    dispatch(getTask({ startDate, endDate }, GET_TODAY_PENDING_TASK_SUCCESS));

    const tomorrowStartDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1, 0, 0, 0, 0)).toISOString();
    const tomorrowEndDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1, 23, 59, 59, 999)).toISOString();
    dispatch(getTask({ startDate: tomorrowStartDate, endDate: tomorrowEndDate }, GET_TOMORROW_TASK_SUCCESS))

    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const diffToSunday = 7 - dayOfWeek;
    const thisWeekStartDate = new Date(
      Date.UTC(today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() + diffToMonday, 0, 0, 0, 0)).toISOString();
    const thisWeekEndDate = new Date(
      Date.UTC(today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() + diffToSunday, 23, 59, 59, 999)).toISOString();
    dispatch(getTask({ startDate: thisWeekStartDate, endDate: thisWeekEndDate }, GET_WEEK_TASK_SUCCESS))
  }, [dispatch])

  const handleAddTask = () => {
    navigate("/todo/add-task")
  };

  return (
    <div>
      <div className='upcoming-main-component'>
        <div className="d-flex align-item-center mt-2">
          <h1 className='main-heading-color'>Upcoming</h1>
          <div className='upcoming-notification d-flex justify-content-center mt-1 border-radius-5 b-ws heading-color'>12</div>
        </div>
        <div className="mt-6">
          <button className='submit-btn input-save-btn border-radius-5'
            onClick={() => handleAddTask()}>
            + &nbsp; Add New Task</button>
          <section className='today-main-section p-4 mt-2'>
            <div>
              <h3 className='heading-color'>Today</h3>
              <div>
                <input placeholder="+ Add New Task" id="add-new-task" className="today-add-input mt-2 font-size" />
              </div>
            </div>
            {Array.isArray(taskReducer.toady_tasks) && taskReducer.toady_tasks.map((item) => (
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
                    {item?.due_date && <div className='d-flex align-item-center'>
                      <CalendarMonthIcon className='todo-icon' />
                      {/* note:- change below date  i remember that split("T")[0] because this can create issue so u have to change that */}
                      <p>{item.due_date.split("T")[0]}</p>
                    </div>}
                    {<div className='d-flex align-item-center ml-2 mr-1'>
                      <span className='todo-option-substask-task d-flex align-item-center justify-content-center'>
                        1 </span>
                      <span className='ml-1'>substask</span>
                    </div>}
                    {item?.list && <div className='d-flex align-item-center ml-1'>
                      <span className='todo-option-substask-list' style={{ backgroundColor: item.list.color_code }}></span>
                      <span className='ml-1'>{item.list.title}</span>
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
                  {Array.isArray(taskReducer?.tomorrow_task) && taskReducer?.tomorrow_task?.map((item) => (
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
                  {Array.isArray(taskReducer?.this_week_task) && taskReducer?.this_week_task?.map((item) => (
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
    </div>
  )
}

export default Upcoming
