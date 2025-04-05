// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
