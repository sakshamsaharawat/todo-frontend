import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyCalendar, StickyWall, Today, Upcoming } from '../pages';
import Navbar from '../components/Navbar/Navbar';
import AddTask from '../pages/AddTask/AddTask';

const TodoRoutes: React.FC = () => {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", height:"100vh" }}>
        <Navbar  />
        <div style={{height: "100vh", overflow:"scroll"}}>
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
