import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import LandingPage from './pages/home';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import VerifyEmail from './pages/verifyEmail';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import AppContainer from './components/appContainer';
import Settings from './pages/settings';
import { setNavigate } from './lib/navigation';

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <Routes>
      {/*

       */}
      <Route path='/' element={<AppContainer />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='settings' element={<Settings />} />
      </Route>

      <Route path='/' index element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/email/verify/:code' element={<VerifyEmail />} />
      <Route path='/password/forgot' element={<ForgotPassword />} />
      <Route path='/password/reset' element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
