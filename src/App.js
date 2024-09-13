
import './App.css';
import Users from './components/users' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>

    
    <div>
        <div className="Title">
          <center>
              <h1>Profile Data</h1>
          </center> 
        </div>

        <Users />

    </div>
  </QueryClientProvider>
  )
}

export default App;
