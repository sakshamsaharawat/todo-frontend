import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "./Calendar.css";
import { RootState } from '../../store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCalendarTask } from '../../State/Calendar/Action';

const localizer = momentLocalizer(moment)
const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

const MyCalendar: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const { calendarTaskReducer } = useSelector((store: any) => store);

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1, 0, 0, 0, 0)).toISOString();
    const endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999)).toISOString();
    dispatch(getCalendarTask({ startDate, endDate }));
  }, []);
  const handleNavigate = (date: any, view: any) => {
    if (view === "month") {
      const startDate = moment.utc(date).startOf("month").format("YYYY-MM-DDT00:00:00.000[Z]");
      const endDate = moment.utc(date).endOf("month").format("YYYY-MM-DDT23:59:59.999[Z]");
      dispatch(getCalendarTask({ startDate, endDate }));
    }
  }

  return (
    <div className='main-calendar'>
      <h1 className='heading-color'>{formattedDate}</h1>
      <div className="mt-2">
        <Calendar
          className='main-calendar'
          localizer={localizer}
          events={calendarTaskReducer.tasks}
          defaultView="month"
          views={["day", "week", "month"]}
          defaultDate={new Date()}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  )
}
export default MyCalendar