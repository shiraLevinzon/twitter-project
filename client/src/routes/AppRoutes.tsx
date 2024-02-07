import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Index';
import Login from '../pages/Login/Index';
import Signup from '../pages/Signup/Index';
import Tweet  from '../pages/Tweet/Index';

const AppRoutes = () => (
  <Routes>
    <Route path="home" element={<Home />} />
    <Route path="signup" element={<Signup />} />
    <Route index element={<Login />} />
    <Route path="tweet" element={<Tweet />} />
  </Routes>
);

export default AppRoutes;
