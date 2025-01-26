

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { AdminPage } from "./pages/adminPage";
import WhackAMole from "./pages/whackeAMole";
import Dashboard from "./pages/dashboard";
import Games from "./pages/games";
import Wordle from "./pages/wordle";
import Chatbox from "./pages/chatbox";
import Profile from "./pages/profile";
import Feedback from "./pages/feedback";
import MoreInfo from "./pages/info";

function App() {
  return (
    <Router>
        <Routes>

          {/* Default route */}
          <Route path="/" element={<>
            <h2>Welcome to the Hospital Dashboard</h2>
            <button onClick={() => window.location.href = '/login'}>Go to Login</button>
          </>
          } />

          {/* Admin Page Route */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/whackeamole" element={<WhackAMole />} />
          <Route path="/wordle" element={<Wordle />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatbox" element={<Chatbox />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/info" element={<MoreInfo />} />
        </Routes>
    </Router>
  );
}

export default App;
