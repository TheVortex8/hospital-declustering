

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import WhackAMole from "./pages/whackeAMole";
import Dashboard from "./pages/dashboard";
import Games from "./pages/games";
import Wordle from "./pages/wordle";
import Chatbox from "./pages/chatbox";
import Profile from "./pages/profile";
import Feedback from "./pages/feedback";
import TriageInfo from "./pages/TriageInfo";
import { AdminPage } from "./pages/adminPage";
import KnowledgeCenter from "./pages/KnowledgeCenter";
import MedicalTestInfo from "./pages/MedicalTestInfo";
import EmergencyCareProcess from "./pages/EmergencyCareProcess";
import BeforeERVisitInfo from "./pages/BeforeERVisitInfo";
import HealthyLifeStyleInfo from "./pages/HealthyLifeStyleInfo";
import ResourcesInfo from "./pages/ResourcesInfo";
import TestInfo from "./pages/TestInfo";

function App() {
  return (
    <Router>
        <Routes>

          {/* Default route */}
          <Route path="/" element={<>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              gap: '20px',
              marginTop: '-45px'
            }}>
              <h2>Welcome to QuickPulse</h2>
              <button onClick={() => window.location.href = '/login'}>Go to Login</button>
            </div>  </>
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
          <Route path="/triageInfo" element={<TriageInfo />} />
          <Route path="/knowledgeCenter" element={<KnowledgeCenter/>} />
          <Route path="/medicalTestInfo" element={<MedicalTestInfo/>} />
          <Route path="/emergencyCareProcess" element={<EmergencyCareProcess/>} />
          <Route path="/ERVisitInfo" element={<BeforeERVisitInfo/>} />
          <Route path="/healthyLifeStyleInfo" element={<HealthyLifeStyleInfo/>} />
          <Route path="/resourcesInfo" element={<ResourcesInfo/>} />
          <Route path="/test" element={<TestInfo/>} />
          

        </Routes>
    </Router>
  );
}

export default App;
