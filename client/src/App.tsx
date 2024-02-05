import { createContext, useState } from 'react';
import './App.css';
import Home from './pages/Home/Index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Index';
import  Signup  from './pages/Signup/Index';
import TweetDocument from '../../types/tweet.type';



export const TweetContext = createContext({});

const queryClient = new QueryClient();
function App() {
  const [tweetsList, setTweetsList] = useState<Array<TweetDocument>>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <TweetContext.Provider value={{ setTweetsList, tweetsList }}>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />}/>
            <Route path="signup" element={<Signup />}/>
            <Route index element={<Home />} />
            
          </Routes>
        </BrowserRouter>

      </TweetContext.Provider>
    </QueryClientProvider>
  );
}

export default App;


