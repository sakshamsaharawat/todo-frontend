import { Route, Routes } from 'react-router-dom';
import './App.css';
import TodoRoutes from './routes/TodoRoutes';
import { HomeRoutes } from './routes';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/todo*" element={<TodoRoutes />} />
        <Route path="/*" element={<HomeRoutes />} />
      </Routes>
    </div>
  )
}

export default App;
