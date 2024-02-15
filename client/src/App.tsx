import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import {TweetProvider} from './context/TweetContext';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient: QueryClient = new QueryClient();

function App() {

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