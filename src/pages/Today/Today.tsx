import React, { useEffect, useState } from 'react';
import './Today.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { todoData } from '../../data/todoData';
import TaskDrawer from '../Task/Task';
import { useNavigate } from 'react-router-dom';
import { getTask } from '../../State/AddTask/Action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Today: React.FC = () => {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();
  const { taskReducer } = useSelector((store: RootState) => store);
  console.log("taskReducer------------",taskReducer)

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
    dispatch(getTask())
  },[dispatch])

  return (
    <div>
      <div className='d-flex align-item-center'>
        <h1 className='main-heading-color ml-4 mt-2'>Today</h1>
        <div className='today-notification d-flex justify-content-center mt-1 border-radius-5'>5</div>
      </div>
      <div className='p-2 mt-4'>
        <div className="box">
          <button className='input-save-btn border-radius-5' onClick={() => handleAddTask()}>+ &nbsp; Add New Task</button>
        </div>
        <section className='today-section mt-1'>
          {todoData.map((item) => (
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
                <div className='align-item-center d-flex' >
                  {item?.date && <div className='d-flex align-item-center mr-1'>
                    <CalendarMonthIcon className='todo-icon' />
                    <p>{item.date}</p>
                  </div>}
                  {item?.list_subtasks && <div className='d-flex align-item-center ml-1'>
                    <span className='today-todo-option-task d-flex align-item-center justify-content-center'>{item?.list_subtasks?.task}</span>
                    <span className='ml-1'>{item.list_subtasks.task_title}</span>
                  </div>}
                  {item?.list_type && <div className='d-flex align-item-center ml-1'>
                    <span className='today-main-list-color-box' style={{ backgroundColor: item.list_type.color_code }}></span>
                    <span className='ml-1'>{item.list_type.title}</span>
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

export default Today;