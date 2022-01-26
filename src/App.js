import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Chats from './components/Chats';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chats' element={<Chats />} />
      </Routes>
    </div>
  );
}

export default App;
