import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Home } from '../pages'
import { Route, Routes } from 'react-router-dom'

const HomeRoutes: React.FC = () => {
  return (
    <>
      <div style={{ padding: "15px" }}>
        <Navbar />
      </div>
      {/* <Routes>
        <Route path="/home" element={<Home />} />
      </Routes> */}
    </>

  )
}

export default HomeRoutes
