import React, { memo, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { routes } from "./routes";
import Navbar from "../ui/components/Navbar";
import Sidebar from "../ui/components/Sidebar";
import Spinner from "../ui/components/Spinner";

const PublicRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const activeUser = JSON.parse(localStorage.getItem("active_user"));
  const role = activeUser?.role;
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      if (role !== "admin") {
        navigate("/dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    }
  }, [token, navigate, role]);

  return <Component />;
};

const ProtectRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const activeUser = JSON.parse(localStorage.getItem("active_user"));
  const role = activeUser?.role;
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (role === "admin") {
      navigate(-1);
    }
  }, [token, navigate, role]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar user={activeUser} />
        <div className="p-8">
          <Suspense fallback={<Spinner />}>
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
  const activeUser = JSON.parse(localStorage.getItem("active_user"));
  const role = activeUser?.role; 
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (role !== "admin") {
      navigate(-1);
    }
  }, [token, navigate, role]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar user={activeUser} />
        <div className="p-8">
          <Suspense fallback={<Spinner />}>
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
