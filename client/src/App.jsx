import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import './index.css';
import { UserAuthProvider } from './context/userAuth';
import Feed from './pages/Feed';
import Upload from './pages/Upload';
import { VideoProvider } from './context/video';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
function App() {

  return (
    <Router>
      <UserAuthProvider>
        <VideoProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} /> 
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
      </VideoProvider>
      </UserAuthProvider>
    </Router>
  )
}

export default App
