import { Route,Routes } from 'react-router-dom';
import './App.css';
import { HomeRoutes } from './routes';

function App() {
  return (
    <div>
      <div>
      <Routes>
        <Route path="*" element={<HomeRoutes />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App;
