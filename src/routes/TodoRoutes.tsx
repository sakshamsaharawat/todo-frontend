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
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/today" element={<Today />} />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/sticky-wall" element={<StickyWall />} />
        </Routes>
      </div>
    </>
  )
}

export default TodoRoutes;
