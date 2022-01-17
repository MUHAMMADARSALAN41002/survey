import React from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forget from '../pages/forgot/Forgot';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import Survey from '../pages/survey/Survey';

const Rootrouter = () => {
    return (
        <>           
            <Router>
                <Routes>
                    <Route path='/*' element={<Login />}/>
                    <Route path='/signup/*' element={<Signup />}/>
                    <Route path='/home/*' element={<Home />}/>
                    <Route path='/forget/*' element={<Forget />}/>
                    <Route path='/survey/*' element={<Survey />}/>
                </Routes>
            </Router>
        </>
    )
}
export default Rootrouter;