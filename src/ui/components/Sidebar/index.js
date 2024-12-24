import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Calendar } from "react-feather";
import { useLocation } from "react-router-dom";

const Index = () => {
  const source = require(`../../../logo.png`);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex">
      <div className="w-64 h-screen bg-slate-800 text-white shadow-md fixed top-0 left-0">
        <div className="flex pt-8">
          <img
            src={source}
            alt="logo img"
            className="w-32 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          />
        </div>
        <ul className="space-y-4 py-8">
          <li>
            <Link
              to="/dashboard"
              className={`block px-6 py-2 text-lg text-white rounded transition-all focus:ring-2 ${
                location.pathname === "/dashboard"
                  ? "bg-gray-500"
                  : "hover:bg-gray-700"
              }`}
            >
              <Home className="mr-3 inline" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className={`block px-6 py-2 text-lg text-white rounded transition-all focus:ring-2 ${
                location.pathname === "/events"
                  ? "bg-gray-500"
                  : "hover:bg-gray-700"
              }`}
            >
              <Calendar className="mr-3 inline" />
              Events
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Index;