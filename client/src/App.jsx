import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import './index.css';
import { UserAuthProvider } from './context/userAuth';
function App() {

  return (
    <Router>
      <UserAuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </UserAuthProvider>
    </Router>
  )
}

export default App
