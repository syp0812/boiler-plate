import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';

function App() {

  const Landing = Auth(LandingPage, null);
  const Login = Auth(LoginPage, false);
  const Register = Auth(RegisterPage, false);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <NavBar />
      <div style={ {paddingTop: '69px', minHeight: 'calc(100vh-80px)'}}>
        <Routes>
          <Route path='/*' element={ <Landing /> } />
          <Route path='/login/*' element={ <Login /> } />
          <Route path = '/register/*' element={ <Register /> } />
        </Routes>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
