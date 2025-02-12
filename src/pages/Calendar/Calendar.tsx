import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "./Calendar.css";

const localizer = momentLocalizer(moment)
const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

const events = [
  {
    title: "Session 1: Marketing Sprint",
    start: new Date(2025, 1, 16, 9, 0),
    end: new Date(2025, 1, 16, 10, 0)
  },
  {
    title: "Sales Catchup",
    start: new Date(2025, 1, 20, 10, 0),
    end: new Date(2025, 1, 22, 11, 0)
  },
  {
    title: "Renew driver's license",
    start: new Date(2025, 1, 16, 11, 0),
    end: new Date(2025, 1, 16, 12, 0)
  }
];

const MyCalendar: React.FC = () => (
  <div className='calendar-component'>
    <h1 className='heading-color'>{formattedDate}</h1>
    <div className="mt-2">
      <Calendar
        className='main-calendar'
        localizer={localizer}
        events={events}
        defaultView="month"
        views={["day", "week", "month"]}
        defaultDate={new Date()}
      />
    </div>
  </div>
)

export default MyCalendar