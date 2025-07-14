import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import JournalEditor from "./pages/JournalEditor";
import JournalDetails from "./pages/JournalDetails";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        {user && <Navbar />}
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/new" element={user ? <JournalEditor /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={user ? <JournalEditor /> : <Navigate to="/login" />} />
          <Route path="/entry/:id" element={user ? <JournalDetails /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
