import Header from './components/Header';
import FrontPage from './components/FrontPage';
import { BrowserRouter } from 'react-router';


function App() {
  return (
    
        <BrowserRouter>
            <Header />
            <FrontPage />
        </BrowserRouter>
    
  );
}

export default App
