import React, { useEffect, useState } from 'react';
import './Upcoming.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { deleteManyTask, getTask } from '../../State/AddTask/Action';
import { useSelector } from 'react-redux';
import { GET_TODAY_PENDING_TASK_SUCCESS, GET_TOMORROW_TASK_SUCCESS, GET_WEEK_TASK_SUCCESS } from '../../State/AddTask/ActionTypes';
import { useNavigate } from 'react-router-dom';
import { TaskItem } from '../../State/AddTask/interface/get-task.interface';
import TaskDrawer from '../Task/Task';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const Upcoming: React.FC = () => {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [type, setType] = useState<string>('Today');
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
    navigate("/todo/add-task");
  };
  const handleOpenTask = (task: any, type: string): void => {
    setType(type);
    setSelectedTask(task);
    setIsTaskDrawerOpen(true);
  };

  const toggleDrawer = (isOpen: boolean): void => {
    setIsTaskDrawerOpen(isOpen);
    if (!isOpen) setSelectedTask(null);
  };
  const formik = useFormik<{ selectedTasks: TaskItem[] }>({
    initialValues: {
      selectedTasks: []
    },
    onSubmit: async (values) => {
      const ids = values.selectedTasks.map(task => task._id);
      await dispatch(deleteManyTask({ ids }));
      toast.success("Tasks deleted successfully.")
    }
  })
  const handleCheckboxChange = (task: TaskItem) => {
    const selectedTasks = formik.values.selectedTasks;

    if (selectedTasks.some(t => t._id === task._id)) {
      formik.setFieldValue(
        "selectedTasks",
        selectedTasks.filter(t => t._id !== task._id)
      );
    } else {
      formik.setFieldValue("selectedTasks", [...selectedTasks, task]);
    }
  };

  return (
    <div>
      <div className='upcoming-main-component'>
        <div className="d-flex align-item-center mt-2">
          <h1 className='main-heading-color'>Upcoming</h1>
          <div className='upcoming-notification d-flex justify-content-center mt-1 border-radius-5 b-ws heading-color'>12</div>
        </div>
        <div className="mt-6">
          <form onSubmit={formik.handleSubmit}>
            <div className='d-flex upcoming-btn'>
              <button className='submit-btn upcoming-input-btn border-radius-5 cursor-pointer'
                onClick={() => handleAddTask()}
                type='button'
              >
                + &nbsp; Add New Task</button>
              <button className='cancel-btn upcoming-input-btn border-radius-5 cursor-pointer ml-5'
                type='submit'
                disabled={formik.values.selectedTasks.length == 0}
              >
                Delete Task</button>
            </div>
            <section className='today-main-section p-4 mt-2'>
              <div>
                <h3 className='heading-color'>Today</h3>
              </div>
              {Array.isArray(taskReducer?.today_tasks) && taskReducer?.today_tasks?.length > 0 ? (
                <div>
                  {Array.isArray(taskReducer?.today_tasks) && taskReducer?.today_tasks.map((item) => (
                    <div className='align-item-center justify-content-center b-bottom-ws f-wrap font-size' >
                      <div className='d-flex align-item-center justify-content-space-between mt-2'>
                        <div className='d-flex ml-4'>
                          <div className='d-flex'>
                            <input
                              type="checkbox"
                              name="selectedTasks"
                              value={item._id}
                              checked={formik.values.selectedTasks.some(t => t._id === item._id)}
                              onChange={() => handleCheckboxChange(item)}
                            />
                          </div>
                          <div className='ml-4'>
                            <p>{item?.title}</p>
                          </div>
                        </div>
                        <div className='d-flex hover cursor-pointer border-radius-5' onClick={() => handleOpenTask(item, "Today")}>
                          <ArrowForwardIosIcon
                            sx={{ fontSize: "50px" }}
                            className='todo-icon' />
                        </div>
                      </div>
                      <div>
                        <div className='todo-main-list d-flex align-item-center mb-2'>
                          {item?.due_date && <div className='d-flex align-item-center'>
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
                          {<div className='d-flex align-item-center ml-2 mr-1'>
                            <span className='todo-option-substask-task d-flex align-item-center justify-content-center'>
                              1 </span>
                            <span className='ml-1'>substask</span>
                          </div>}
                          {item?.list && <div className='d-flex align-item-center ml-1'>
                            <span className='todo-option-substask-list' style={{ backgroundColor: item?.list.color_code }}></span>
                            <span className='ml-1'>{item?.list?.title}</span>
                          </div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>) : (
                <div className="d-flex align-item-center justify-content-center flex-direction-column">
                  <img src="/document.png" className='no-task-image' />
                  <h4>No task to display</h4>
                </div>
              )}
            </section>
          </form>
          <section className='today-sub-section d-flex mt-3'>
            <section className='this-week-tomoarrow-container cursor-pointer border-radius-10'>
              <div className='p-4'>
                <div className='today-sub-section-title'>
                  <h3 className='sub-heading-color'>Tomorrow</h3>
                </div>
                {Array.isArray(taskReducer?.tomorrow_task) && taskReducer?.tomorrow_task?.length > 0 ? (
                  <div className='upcoming-main-content'>
                    {Array.isArray(taskReducer?.tomorrow_task) && taskReducer?.tomorrow_task?.map((item) => (
                      <div className='align-item-center justify-content-center b-bottom-ws f-wrap font-size'>
                        <div className='d-flex align-item-center justify-content-space-between mt-2'>
                          <div className='d-flex ml-3 mb-2'>
                            <div className='d-flex'>
                              <input
                                type="checkbox"
                                name="selectedTasks"
                                value={item._id}
                                checked={formik.values.selectedTasks.some(t => t._id === item._id)}
                                onChange={() => handleCheckboxChange(item)}
                              />
                            </div>
                            <div className='ml-4'>
                              <p>{item.title}</p>
                            </div>
                          </div>
                          <div className='d-flex hover cursor-pointer border-radius-5' onClick={() => handleOpenTask(item, "Today")}>
                            <ArrowForwardIosIcon
                              sx={{ fontSize: "50px" }}
                              className='todo-icon' />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="d-flex align-item-center justify-content-center flex-direction-column">
                    <img src="/document.png" className='no-task-image' />
                    <h4>No task to display</h4>
                  </div>
                )}
              </div>
            </section>
            <section className='this-week-tomoarrow-container cursor-pointer border-radius-10'>
              <div className='p-4 border'>
                <div className='today-sub-section-title'>
                  <h3 className='sub-heading-color'>This Week</h3>
                </div>
                {Array.isArray(taskReducer?.this_week_task) && taskReducer?.this_week_task?.length > 0 ? (
                  <div className='upcoming-main-content'>
                    {Array.isArray(taskReducer?.this_week_task) && taskReducer?.this_week_task?.map((item) => (
                      <div className='align-item-center justify-content-center b-bottom-ws f-wrap font-size'>
                        <div className='d-flex align-item-center justify-content-space-between mt-2'>
                          <div className='d-flex ml-3 mb-2'>
                            <div className='d-flex'>
                              <input
                                type="checkbox"
                                name="selectedTasks"
                                value={item._id}
                                checked={formik.values.selectedTasks.some(t => t._id === item._id)}
                                onChange={() => handleCheckboxChange(item)}
                              />
                            </div>
                            <div className='ml-4'>
                              <p>{item?.title}</p>
                            </div>
                          </div>
                          <div className='d-flex hover cursor-pointer border-radius-5' onClick={() => handleOpenTask(item, "Today")}>
                            <ArrowForwardIosIcon
                              sx={{ fontSize: "50px" }}
                              className='todo-icon' />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>) : (
                  <div className="d-flex align-item-center justify-content-center flex-direction-column">
                    <img src="/document.png" className='no-task-image' />
                    <h4>No task to display</h4>
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
      </div>
      {selectedTask && <TaskDrawer
        isOpen={isTaskDrawerOpen}
        toggleDrawer={toggleDrawer}
        taskDetails={selectedTask}
        type={type}
      />}
    </div>
  )
}
export default Upcoming;