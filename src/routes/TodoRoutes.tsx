import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyCalendar, StickyWall, Today, Upcoming } from '../pages';
import Navbar from '../components/Navbar/Navbar';

const TodoRoutes: React.FC = () => {
  return (
    <>
      <div className='main-component p-2 ' style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
        <Navbar />
        <Routes>
          <Route path="/todo/upcoming" element={<Upcoming />} />
          <Route path="/todo/today" element={<Today />} />
          <Route path="/todo/calendar" element={<MyCalendar />} />
          <Route path="/todo/sticky-wall" element={<StickyWall />} />
        </Routes>
      </div>
    </>
  )
}

export default TodoRoutes;
