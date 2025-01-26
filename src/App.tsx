

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { AdminPage } from "./pages/adminPage";
import WhackAMole from "./pages/whackeAMole";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          
          {/* Default route */}
          <Route path="/" element={<h2>Welcome to the Hospital Dashboard</h2>} />

          {/* Admin Page Route */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/whackeamole" element={<WhackAMole />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
