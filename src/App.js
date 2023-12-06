import { useSelector } from 'react-redux';
import './App.css';
import Player from './components/Player';
import SideBar from './components/SideBar';

function App() {
  const burger = useSelector((state) => state.style.burger);
  return (
    <div className='content'
      style={{ gridTemplateColumns: `${burger ? "300px" : "0px"} 1fr` }}
    >
      <SideBar />
      <Player />
    </div>
  );
}

export default App;
