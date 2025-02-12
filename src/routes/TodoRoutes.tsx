import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyCalendar, StickyWall, Today, Upcoming } from '../pages';
import Navbar from '../components/Navbar/Navbar';
import AddTask from '../pages/AddTask/AddTask';

const TodoRoutes: React.FC = () => {
  return (
    <>
      <div className='height-100vh display-grid grid-template-columns-auto-1fr '>
        <Navbar />
        <div className="p-3 height-100vh overflow-scroll">
          <Routes>
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/today" element={<Today />} />
            <Route path="/calendar" element={<MyCalendar />} />
            <Route path="/sticky-wall" element={<StickyWall />} />
            <Route path="/add-task" element={<AddTask />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default TodoRoutes;
