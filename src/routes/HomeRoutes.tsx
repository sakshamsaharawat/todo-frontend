import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { TaskDrawer } from '../pages'

const HomeRoutes: React.FC = () => {
  return (
    <>
      <div style={{ padding: "15px" }}>
        <Navbar />
      </div>
      <div>
        {/* <Routes>
          <Route path="/task" element={<TaskDrawer isOpen={true} toggleDrawer={() => { }} />} />
        </Routes> */}
      </div>
    </>

  )
}

export default HomeRoutes
