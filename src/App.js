import './App.css';
import SingIn from './components/auth/SingIn';
import SingUp from './components/auth/SingUp';
import Navbar from './components/user/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/containers/Home';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
import NotFound from './components/NotFound';
import { useAuth } from './hooks';
import AdminNavigator from './navigator/AdminNavigator';
import SingleMovie from './components/user/SingleMovie';
import MovieReviews from './components/user/MovieReviews';
import SearchMovies from './components/user/SearchMovies';

function App() {

  const {authInfo} = useAuth();
  const isAdmin = authInfo.profile?.role === 'admin';
  
  if(isAdmin) return <AdminNavigator />

  return (
    < >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<SingIn />} />
        <Route path="/auth/signup" element={<SingUp />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ConfirmPassword />} />
        <Route path="/movie/:movieId" element={<SingleMovie />} />
        <Route path="/movie/reviews/:movieId" element={<MovieReviews />} />
        <Route path="/movie/search" element={<SearchMovies />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
