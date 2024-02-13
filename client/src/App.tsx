import { createContext, useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from './context/UserContext';
import TweetContext from './context/TweetContext';
import AppRoutes from './routes/AppRoutes';
import UserDocument from '../../types/user.type';
import React from 'react';


const queryClient: QueryClient = new QueryClient();

function App() {

  const [tweet, setTweet] = useState({});
  const [user, setUser] = useState({});


  return (
    <QueryClientProvider client={queryClient}>
      <TweetContext.Provider value={{ tweet, setTweet }}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UserContext.Provider>
      </TweetContext.Provider>
    </QueryClientProvider>
  );
}

export default App;