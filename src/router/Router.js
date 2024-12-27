import React, { memo, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { routes } from "./routes";
import { useSelector } from "react-redux";
import Navbar from "../ui/components/Navbar"
import Sidebar from "../ui/components/Sidebar";

const PublicRoute = (props) => {
  debugger
  const { Component } = props;
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state?.user);

  const token = JSON.parse(localStorage.getItem("active_user"))?.isVerified;
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return <Component />;
};

const ProtectRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state?.user);

  // useEffect(()=>{
  //  const user= localStorage.getItem("active_user");
  //  if(!user){
  //   navigate('/')
  //  }
  // },[])
  const token = JSON.parse(localStorage.getItem("active_user"))?.isVerified;
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token,navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar user={activeUser} />
        <div className="p-8">
          <Component />
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
