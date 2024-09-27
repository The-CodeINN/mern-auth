import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import LandingPage from './pages/home';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import VerifyEmail from './pages/verifyEmail';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';

function App() {
  return (
    <Routes>
      <Route path='/' index element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/email/verify/:code' element={<VerifyEmail />} />
      <Route path='/password/forgot' element={<ForgotPassword />} />
      <Route path='/password/reset' element={<ResetPassword />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
