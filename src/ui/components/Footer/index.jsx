//library
import React from "react";
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory

//style
import "../../pages/Home/home.css";

//images
import logo from "../../../assets/images/home/logo.png";
import twitter from "../../../assets/images/home/twitter.svg";
import linkin from "../../../assets/images/home/linkin.svg";
import facebook from "../../../assets/images/home/facebook.svg";
import instra from "../../../assets/images/home/instra.svg";
import playstore from "../../../assets/images/about/playstore.png";
import googlePlay from "../../../assets/images/about/googleplay.png";
import apple from "../../../assets/images/home/apple_app.png";

const Index = () => {
  const navigate = useNavigate();  
  return (
    <div>
      <footer className='pb-2'>
        <div className='container'>
          <div className='row footer pt-5 mt-lg-5'>
            <div className='col-xxl-4 col-xl-3 col-lg-3 col-md-6 mt-md-0 mt-2'>
              <div className='footer1'>
                <a href='/'><img className='pt-0' src={logo} width='200px' /></a>
                <p className='pt-1 pb-1'>DSA is the link between the customer and the lender. He is supposed to ensure a basic check is done about the background.</p>
              </div>
            </div>
            <div className='col-xxl-2  col-lg-2 col-md-6 mt-md-0 mt-2'>
              <div className='footer2 d-grid justify-content-lg-center justify-content-md-center'>
                <h5>Company</h5>
                <a onClick={() => navigate("/")}>Home</a> 
                <a onClick={() => navigate("/about")}>About Us</a> 
                <a href="#features" onClick={() => navigate("/feature")}>
                  Features
                </a> 
              </div>
            </div>
            <div className='col-xxl-2 col-lg-2 col-md-6 mt-md-0 mt-2'>
              <div className='footer2 d-grid justify-content-lg-center justify-content-md-start'>
                <h5>Get in touch</h5>
                <a onClick={() => navigate("/contact-us")}>Contact Us</a>
                <a onClick={() => navigate("/schedule-demo")}>Schedule Demo</a>
                <a onClick={() => navigate("/faq")}>FAQs</a> 
              </div>
            </div>
            <div className='col-xxl-2 col-lg-2 col-md-6 mt-md-0 mt-2'>
              <div className='footer2 ms-sm-0 d-grid justify-content-md-center'>
                <h5>More</h5>
                <a onClick={() => navigate("/term-of-use")}>Terms of Use</a> 
                <a onClick={() => navigate("/privacy-policy")}>Privacy Policy</a> 
              </div>
            </div>
            <div className='col-xxl-2 col-lg-2 col-md-6 mt-md-0 mt-2'>
              <div className='justify-content-end'>
                <div className='d-flex ps-md-0'>
                  <div className='footer_img'><img src={twitter} alt="twitter" /></div>
                  <div className='footer_img'><img src={linkin} alt="linkin" /></div>
                  <div className='footer_img'><img src={facebook} alt="facebook" /></div>
                  <div className='footer_img'><img src={instra} alt="instra" /></div>
                </div>
                <div className='footer3 ps-md-0'>
                  <p className='pt-2 ms-2'>Discover our app</p>
                  <div className='app'>
                    <div className='app_btn me-1'>
                      <a>
                        <img src={googlePlay} alt="googleplay" />
                      </a>
                    </div>
                    <div className='app_btn'>
                      <a>
                        <img src={playstore} alt="playstore" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
