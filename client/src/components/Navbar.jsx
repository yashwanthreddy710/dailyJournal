import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white px-4 py-3 shadow-lg flex items-center justify-between">
      <h1
        className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
      >
        Daily Journal
      </h1>

      
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-gray-900 md:static md:flex md:items-center md:gap-6 md:w-auto`}
      >
        {user && (
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 px-4 py-2 md:p-0">
            <Link
              to="/"
              className="hover:text-purple-400 pointer transition"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/new"
              className="hover:text-purple-400 pointer transition"
              onClick={() => setIsOpen(false)}
            >
              New Entry
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600  hover:bg-red-700 px-3 py-1 rounded pointer transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
