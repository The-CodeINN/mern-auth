import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import LandingPage from './pages/home';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
