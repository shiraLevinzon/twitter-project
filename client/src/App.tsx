import { createContext, useState } from 'react';
import './App.css';
import Home from './pages/Home/Index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Index';
import Signup from './pages/Signup/Index';
import { UserContext } from './context/UserContext';
import TweetContext from './context/TweetContext';
import { Tweet } from './pages/Tweet/Tweet';
import AppRoutes from './routes/AppRoutes';


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


