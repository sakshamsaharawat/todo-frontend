import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyCalendar, StickyWall, Today, Upcoming } from '../pages';

const HomeRoutes: React.FC = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Upcoming />} />
          <Route path="/today" element={<Today />} />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/sticky-wall" element={<StickyWall />} />
        </Routes>
      </div>
    </>
  )
}

export default HomeRoutes;
