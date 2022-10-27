import Navigation from 'components/Navigation';
import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profiles from 'routes/Profiles';

function AppRouter({isLoggedIn, userObj}) {

    return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLoggedIn && <Navigation />}
        <Routes>
            {isLoggedIn ? (
            <>
            <Route path='/' element={<Home userObj={userObj}/>} />
            <Route path='/profile' element={<Profiles userObj={userObj}/>} />
            </>
            ) : (
            <Route path='/' element={<Auth />}/>
            )}
            {/* 로그인이 되었을때 true면  <Route /> false면 후자 <Route /> 
            {isLoggedIn ? <Route/> : <Route />}*/}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter