import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = momentLocalizer(moment)

const events = [
  {
    title: "Session 1: Marketing Sprint",
    start: new Date(2025, 1, 16, 9, 0), // February 16, 2022, 9:00 AM
    end: new Date(2025, 1, 16, 10, 0),
  },
  {
    title: "Sales Catchup",
    start: new Date(2025, 1, 20, 10, 0),
    end: new Date(2025, 1, 22, 11, 0),
  },
  {
    title: "Renew driver's license",
    start: new Date(2025, 1, 16, 11, 0),
    end: new Date(2025, 1, 16, 12, 0),
  },
];

const MyCalendar: React.FC = () => (
  <div className='calendar-component'>
    <Calendar
    className='main-calendar'
      localizer={localizer}
      events={events}
      defaultView="day"
      views={["day", "week", "month"]}
      defaultDate={new Date(2022, 1, 16)}
    />
  </div>
)

export default MyCalendar