import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Calendar, Tv, ChevronsLeft, ChevronsRight } from "react-feather";
import { useLocation } from "react-router-dom";

const Index = ({ onCollapseChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const source = require(`../../../logo.png`);
  const activeUser = JSON.parse(localStorage.getItem("active_user"));
  const role = activeUser?.role || "";
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    if (role === "admin") {
      navigate("/admin-dashboard")
    } else {
      navigate("/dashboard")
    }
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

  useEffect(() => {
    // Notify parent component about sidebar collapse state
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

  return (
    <div className="flex">
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-slate-800 text-white shadow-md fixed top-0 left-0 transition-all duration-300 ease-in-out`}>
        <div className="flex justify-between items-center pt-4 px-4">
          {!isCollapsed && (
            <img
              src={source}
              alt="logo img"
              className="w-32 cursor-pointer"
              onClick={handleNavigate}
            />
          )}
          <button 
            onClick={toggleSidebar} 
            className="text-white hover:bg-gray-700 rounded p-2 ml-auto"
          >
            {isCollapsed ? <ChevronsRight size={24} /> : <ChevronsLeft size={24} />}
          </button>
        </div>
        <ul className={`space-y-4 py-8 ${isCollapsed ? 'px-2' : 'px-6'}`}>
          <li>
            <Link
              to={role !== "admin" ? "/dashboard" : "/admin-dashboard"}
              className={`block py-2 text-lg text-white rounded transition-all focus:ring-2 ${
                location.pathname === (role !== "admin" ? "/dashboard" : "/admin-dashboard")
                  ? "bg-gray-500"
                  : "hover:bg-gray-700"
              } ${isCollapsed ? 'text-center px-2' : 'px-6'}`}
              title={isCollapsed ? (role !== "admin" ? "Dashboard" : "Admin Dashboard") : ""}
            >
              <Home className={`${isCollapsed ? 'mx-auto' : 'mr-3 inline'}`} />
              {!isCollapsed && "Dashboard"}
            </Link>
          </li>
          {role !== "admin" ? (
            <li>
              <Link
                to="/events"
                className={`block py-2 text-lg text-white rounded transition-all focus:ring-2 ${
                  location.pathname === "/events"
                    ? "bg-gray-500"
                    : "hover:bg-gray-700"
                } ${isCollapsed ? 'text-center px-2' : 'px-6'}`}
                title={isCollapsed ? "Events" : ""}
              >
                <Calendar className={`${isCollapsed ? 'mx-auto' : 'mr-3 inline'}`} />
                {!isCollapsed && "Events"}
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/user"
                  className={`block py-2 text-lg text-white rounded transition-all focus:ring-2 ${
                    location.pathname === "/user"
                      ? "bg-gray-500"
                      : "hover:bg-gray-700"
                  } ${isCollapsed ? 'text-center px-2' : 'px-6'}`}
                  title={isCollapsed ? "User" : ""}
                >
                  <Calendar className={`${isCollapsed ? 'mx-auto' : 'mr-3 inline'}`} />
                  {!isCollapsed && "User"}
                </Link>
              </li>
              <li>
                <Link
                  to="/userevent"
                  className={`block py-2 text-lg text-white rounded transition-all focus:ring-2 ${
                    location.pathname === "/userevent"
                      ? "bg-gray-500"
                      : "hover:bg-gray-700"
                  } ${isCollapsed ? 'text-center px-2' : 'px-6'}`}
                  title={isCollapsed ? "UserEvent" : ""}
                >
                  <Tv className={`${isCollapsed ? 'mx-auto' : 'mr-3 inline'}`} />
                  {!isCollapsed && "UserEvent"}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Add padding to main content when sidebar is present */}
      <div className={`${isCollapsed ? 'pl-16' : 'pl-64'} flex-1 transition-all duration-300 ease-in-out`}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Index;
