

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/adminPage";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div>
        <h1>Admin Dashboard</h1>
        <Routes>
          
          {/* Default route */}
          <Route path="/" element={<h2>Welcome to the Hospital Dashboard</h2>} />

          {/* Admin Page Route */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
