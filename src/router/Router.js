import React, { memo, useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { routes } from "./routes";
import { useSelector } from "react-redux";
import Navbar from "../ui/components/Navbar";
import Sidebar from "../ui/components/Sidebar";

const PublicRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state?.user);
  const role = activeUser?.role;
  const token = JSON.parse(localStorage.getItem("active_user"))?.isVerified;
  useEffect(() => {
    if (token) {
      if (role !== "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    }
  }, [token, navigate]);

  return <Component />;
};

const ProtectRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state?.user);
  const role = activeUser?.role;
  const token = JSON.parse(localStorage.getItem("active_user"))?.isVerified;
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (role === "Admin") {
      navigate(-1);
    }
  }, [token, navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar user={activeUser} />
        <div className="p-8">
          <Suspense fallback={null}>
            <Component />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const AdminRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state?.user);
  const role = activeUser?.role;
  const token = JSON.parse(localStorage.getItem("active_user"))?.isVerified;
  useEffect(() => {
    if (role !== "Admin") {
      navigate(-1);
    }
  }, [token, navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar user={activeUser} />
        <div className="p-8">
          <Suspense fallback={null}>
            <Component />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const Routers = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((d, key) => {
          if (d.layout === "user") {
            return (
              <Route
                key={key}
                path={d.path}
                element={<PublicRoute Component={d.element} />}
              />
            );
          }
          if (d.layout === "admin") {
            return (
              <Route
                key={key}
                path={d.path}
                element={<AdminRoute Component={d.element} />}
              />
            );
          } else {
            return (
              <Route
                key={key}
                path={d.path}
                element={<ProtectRoute Component={d.element} />}
              />
            );
          }
        })}
      </Routes>
    </BrowserRouter>
  );
});

export default Routers;
