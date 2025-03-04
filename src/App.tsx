import { Route, Routes } from 'react-router-dom';
import './App.css';
import TodoRoutes from './routes/TodoRoutes';
import { HomeRoutes } from './routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/todo/*" element={<TodoRoutes />} />
        <Route path="/*" element={<HomeRoutes />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
export default App;