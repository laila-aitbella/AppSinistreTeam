import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Componnents/Navbar"; // ✅ Import Navbar
import SignUp from "./Pages/SignUp";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";
import UpdateProfile from "./Pages/UpdateProfile";
import Forget from "./Pages/Forget";
import Smart from "./Pages/Smart";
import Transfer from './componentsSmart/Transfer';
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";



const App = () => {
  return (
    <Router>
      <Navbar /> {/* 🔥 Navbar visible partout */}
      <div style={{ paddingTop: "70px" }}></div>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
      
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/smart" element={<Smart />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
