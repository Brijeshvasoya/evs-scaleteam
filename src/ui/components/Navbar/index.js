import React, { Fragment, useEffect, useState } from "react";
import NavbarUser from "./NavbarUser";
import { useSelector } from "react-redux";

const Index = (props) => {
    const [user,setUser]=useState({})
    useEffect(()=>{
      const user=  JSON.parse(localStorage.getItem("active_user"))
      setUser(user)
    },[])



    useEffect(()=>{

    },[])


    
  return (
    <Fragment>
      <div className="flex justify-between items-center p-4 mx-5 my-5 bg-slate-800 text-white rounded-md shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome { user && user?.fname} {user?.lname || ""}
          </h1>
        </div>
        <div>
          <NavbarUser />
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
