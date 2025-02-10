//library
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//images
import logo from '../../../assets/images/logo/evslogo.png'

const Index = () => {
  const navigate = useNavigate();  
  const location = useLocation();
  
  return (
    <div>
      <header className='header homeHeader'>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" ><img className='pt-0 logo' src={logo} width='200px' onClick={() => navigate("/")} /></a> 
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"><i className="fa-solid fa-bars"></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav nav ps-0">
                <li className="nav-item">
                  <a className={location.pathname === "/" ? "nav-link active" : "nav-link"} aria-current="page" onClick={() => navigate("/")}>Home</a> 
                </li>
                <li className="nav-item">
                  <a className={location.pathname === "/pricing" ? "nav-link active" : "nav-link"} onClick={() => navigate("/pricing")}>Pricing</a> 
                </li>
                <li className="nav-item">
                  <a className={location.pathname === "/feature" ? "nav-link active" : "nav-link"} href="#features" onClick={() => navigate("/feature")}>Features</a>
                </li>
                <li className="nav-item">
                  <a className={location.pathname === "/about" ? "nav-link active" : "nav-link"} onClick={() => navigate("/about")}>About Us</a> 
                </li>
                <li className="nav-item">
                  <a className={location.pathname === "/schedule-demo" ? "nav-link active" : "nav-link"} onClick={() => navigate("/schedule-demo")}>Schedule Demo</a> 
                </li>
                <li className="nav-item">
                  <a className={location.pathname === "/faq" ? "nav-link active" : "nav-link"} onClick={() => navigate("/faq")}>FAQs</a> 
                </li>
              </ul>
              <form className="d-flex">
                <button className="login-btn" type="submit" onClick={() => navigate("/login")}>LOG IN</button> 
              </form>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Index;
