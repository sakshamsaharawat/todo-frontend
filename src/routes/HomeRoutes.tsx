import { Route, Routes } from 'react-router-dom'
import { AddList, Home, SignUp } from '../pages'
import Login from '../pages/Login/Login'

const HomeRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        {/* <Route path="/add-list" element={<AddList />} /> */}

      </Routes>
    </div>
  )
}

export default HomeRoutes
