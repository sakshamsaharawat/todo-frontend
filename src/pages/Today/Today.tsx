import React, { useEffect, useState } from 'react';
import './Today.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskDrawer from '../Task/Task';
import { useNavigate } from 'react-router-dom';
import { getTask } from '../../State/AddTask/Action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GET_TODAY_TASK_SUCCESS } from '../../State/AddTask/ActionTypes';
import { TaskItem } from '../../State/AddTask/interface/get-task.interface';

const Today: React.FC = () => {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const navigate = useNavigate();
  const { taskReducer } = useSelector((store: RootState) => store);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const handleOpenTask = (task: any): void => {
    setSelectedTask(task);
    setIsTaskDrawerOpen(true);
  };

  const toggleDrawer = (isOpen: boolean): void => {
    setIsTaskDrawerOpen(isOpen);
    if (!isOpen) setSelectedTask(null);
  };
  const handleAddTask = () => {
    navigate("/todo/add-task")
  };
  useEffect(() => {
    const today = new Date();
    const startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0)).toISOString();
    const endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999)).toISOString();
    dispatch(getTask({ startDate, endDate }, GET_TODAY_TASK_SUCCESS))
  }, [dispatch])

  return (
    <div>
      <div className='d-flex align-item-center'>
        <h1 className='main-heading-color ml-4 mt-2'>Today</h1>
        <div className='today-notification d-flex justify-content-center mt-1 border-radius-5'>5</div>
      </div>
      <button className='submit-btn input-save-btn border-radius-5 cursor-pointer mt-5' onClick={() => handleAddTask()}>+ &nbsp; Add New Task</button>
      <div className='today-main-container p-2 mt-4'>
        {Array.isArray(taskReducer?.today_tasks) && taskReducer.today_tasks.length > 0 ? (
          <section className='today-section mt-1'>
            {Array.isArray(taskReducer?.today_tasks) && taskReducer?.today_tasks?.map((item) => (
              <div className='today-todo-component font-size b-bottom-ws cursor-pointer align-items-center'
                onClick={() => handleOpenTask(item)}
              >
                <div className='today-todo-content d-flex align-items-center mt-2 justify-content-space-between'>
                  <div className='d-flex align-items-center ml-3'>
                    <div className='d-flex'>
                      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    </div>
                    <div>
                      <p className='ml-3'>{item?.title}</p>
                    </div>
                  </div>
                  <div>
                    <ArrowForwardIosIcon className='todo-icon' />
                  </div>
                </div>
                <div className='today-main-list d-flex align-item-center mb-1'>
                  <div className='today-sub-content align-item-center d-flex'>
                    {item?.due_date && <div className='d-flex align-item-center mr-1'>
                      <CalendarMonthIcon className='todo-icon' />
                      <p>
                        {item?.due_date
                          ? new Intl.DateTimeFormat("en-GB", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }).format(new Date(item.due_date))
                            .replace(/\//g, "-")
                          : "No Due Date"}
                      </p>
                    </div>}
                    <div className='d-flex align-item-center ml-1'>
                      <span className='today-todo-option-task d-flex align-item-center justify-content-center'>1</span>
                      <span className='ml-1'>Subtask</span>
                    </div>
                    {item?.list && <div className='d-flex align-item-center ml-1'>
                      <span className='today-main-list-color-box' style={{ backgroundColor: item?.list?.color_code }}></span>
                      <span className='ml-1'>{item?.list?.title}</span>
                    </div>}
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="icon-main-container">
            <img src="/document.png" className='no-task-image' />
            <h2 className='ml-5'>No task to display</h2>
          </div>
        )}
      </div>
      {selectedTask && <TaskDrawer
        isOpen={isTaskDrawerOpen}
        toggleDrawer={toggleDrawer}
        taskDetails={selectedTask}
        type="Today"
      />}
    </div>
  )
}
export default Today;