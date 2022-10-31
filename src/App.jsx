import { Routes, Route } from 'react-router-dom';
import { SessionProvider } from './contexts/session-context';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  return (
    <SessionProvider>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </SessionProvider>
  );
}

export default App;
