import './App.css';
import Navbar from './components/Navbar/Navbar';
import { HomeRoutes } from './routes';

function App() {
  return (
    <div >
      <div className='main-component p-2 ' style={{ display: "grid", gridTemplateColumns: "auto 1fr"}}>
        <Navbar />
        <HomeRoutes />
      </div>
    </div>
  )
}

export default App;
