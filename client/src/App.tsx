import { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import {TweetProvider} from './context/TweetContext';
import AppRoutes from './routes/AppRoutes';
import UserDocument from '../../types/user.type';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient: QueryClient = new QueryClient();

function App() {

  const [tweet, setTweet] = useState({});
  const [user, setUser] = useState({});


  return (
    <QueryClientProvider client={queryClient}>
      <TweetProvider>
        <UserProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UserProvider>
      </TweetProvider>
    </QueryClientProvider>
  );
}

export default App;