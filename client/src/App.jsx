import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import './index.css';
import { UserAuthProvider } from './context/userAuth';
import Feed from './pages/Feed';
function App() {

  return (
    <Router>
      <UserAuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} /> 
      </Routes>
      </UserAuthProvider>
    </Router>
  )
}

export default App
