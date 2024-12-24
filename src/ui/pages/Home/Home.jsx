//library
import React from "react";
import { useNavigate } from 'react-router-dom';
//components

import Information from "../../components/Information"

//style
import "./home.css"
//images

import dsaimg from "../../../assets/images/home/banner-img.png";
import Illustrationdsagirl from "../../../assets/images/home/Illustrationdsagirl.png";
import mony from "../../../assets/images/home/mony.png";
import circle from "../../../assets/images/home/circle.png";
import team from "../../../assets/images/home/team.png";
import notes from "../../../assets/images/home/notes.png";
import $_img from "../../../assets/images/home/dsa-benifit.png";
import benifit_img from "../../../assets/images/home/benifit_img.svg";
import benifit_img2 from "../../../assets/images/home/benifit_img1.svg";
import benifit_img1 from "../../../assets/images/home/benifit_img2.svg";
import benifit_img3 from "../../../assets/images/home/benifit_img4.svg";
import benifit_img4 from "../../../assets/images/home/benifit_img5.svg";
import benifit_img5 from "../../../assets/images/home/benifit_img6.svg";
import benifit_img6 from "../../../assets/images/home/benifit_img7.svg";
import benifit_img7 from "../../../assets/images/home/benifit_img8.svg";
import phone_img from "../../../assets/images/home/phone_img.png";
import Apple from "../../../assets/images/home/Apple.svg";
import robot from "../../../assets/images/home/robot.svg";
import infrastructure from "../../../assets/images/home/infrastrcuture.png";
import security from "../../../assets/images/home/security.png";
import CRM from "../../../assets/images/home/CRM.png";
import fastAgile from "../../../assets/images/home/fastAgile.png";
import compatibility from "../../../assets/images/home/compatibility.png";
import unBeatableValue from "../../../assets/images/home/unBeatableValue.png";

function home() {
  return (
    <div>
      <div className="dsa_homeHeader_img"></div>


      <section className='pt-lg-5 banner-sec'>
        <div className='container'>
          <div className='row dsa_first position-relative'>
            <div className='col-xl-7 col-lg-6 col-md-12 col-sm-12'>
              <div className='first-col'>
                <h1><span className='DSA-text'>DSA.OS</span> is a Complete Operating System for DSA (Direct Selling Agents) <br />To Manage
                  Their Business in <br />a Modern Way</h1>
                <p className='DSA-line'>World’s No: 1 most intuitive, hyper-performance, and technology-enabled Operating System built by DSA for DSA.</p>
                <div className='buttons'>
                  <button className='DSA-btn mb-sm-4 mb-4' >Schedule Demo</button>
                  <button className='DSA-firstbtn'>Register</button>
                </div>
              </div>
            </div>
            <div className='col-xl-5 col-lg-6 col-md-12 col-sm-12'>
              <div className='imgs'>
                <img src={dsaimg} className='img-fluid dsa-img'></img>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="girl-intro-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="girl-img">
                <img src={Illustrationdsagirl}></img>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 girl">
              <div className="section-2">
                <p className="part1 mb-2">Get Introduced</p>
                <p className="maneg-text">
                  Manage your Customers from Anywhere, Anytime
                </p>
                <p className="app-text">
                  DSA.OS is a Cloud-based SaaS application developed to handle
                  day to day tasks of a DSA such as Creating leads, Configure
                  loan types, Schedule follow-ups, Maintain loan specific
                  workflows, Providing SMS and Email notifications, Creating a
                  team of executives, Multiple types of reports, Maintain
                  activity logs, Publically sharable lead collection forms,
                  Integration via Whatsapp, Create support tickets, etc..
                </p>
                <button>
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="mb-5" id="features">
        <div className="container">
          <div>
            <p className="abc">DSA.OS HIGHLIGHT</p>
            <h6 className="abc-text">Meet Our Cool Features</h6>
          </div>
          <div className="row card_Edit">
            <div className="col-xl-3 col-md-6 col-12 mt-md-5 mt-sm-5 mt-lg-5 m-auto card_Edit1">
              <div className="dsa3">
                <img src={mony}></img>
                <h5>Manage your Leads</h5>
                <p>
                  Never miss out on a lead! Capture all your website visitors’
                  information from your Webforms directly into your Online CRM
                  System and avoid the hassle of managing data in multiple
                  platforms online.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-12 mt-md-5 mt-5 m-auto card_Edit2">
              <div className="dsa3">
                <img src={circle}></img>
                <h5>Update your Followups</h5>
                <p>
                  Streamline the distribution of all your leads to your sales
                  executives based on their location or any specific criteria.
                  With DSA.OS, you can create distribution Rules & Conditions
                  which in turn help you reduce your response time.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-12 mt-md-5 mt-5 m-auto card_Edit3">
              <div className="dsa3">
                <img src={team}></img>
                <h5>Manage your Team</h5>
                <p>
                  {" "}
                  DSA.OS Leads Management encompasses all your sales activities
                  in converting your sales lead successfully. Qualification
                  Cycle consists of default lead statuses which can be further
                  configured based on your business qualification stages.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-12 mt-md-5 mt-5 m-auto card_Edit4">
              <div className="dsa3">
                <img src={notes}></img>
                <h5>Graphical Representation</h5>
                <p>
                  DSA.OS offers all its users the ability to prevent duplicate
                  contacts while entering new contacts. Teams will be notified
                  with an alert, where they can prevent the duplication or warn
                  & flag it for review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="pb-5 choose-card-sec">
        <div className="container back-color">
          <div className="title">
            <h1>Why Choose Us</h1>
          </div>
          <div className='row m-0'>
            <div className='col-xl-10 col-lg-11 col-md-12 col-md-12 col-sm-12 m-auto pt-lg-5'>
              <div className='row choose-card-row'>
                <div className='col-lg-6 col-md-12 col-sm-12 ps-xl-2 pt-lg-0 pt-2 mt-lg-3 ps-lg-3'>
                  <div className='first-card'>
                    <div className='chose-box-img'><img src={infrastructure}></img></div>
                    <div className='ps-1 choose_par'><h5>Infrastructure</h5>
                      <p>Hosted in the India, the Rock-Solid 24x7 infrastructure ensures real-time offsite backups with 256-bit SSL encryption for all communication.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 ps-xl-5 pt-lg-0 pt-5 mt-lg-3 ps-lg-3">
                  <div className="first-card">
                    <div className="chose-box-img">
                      <img src={security}></img>
                    </div>
                    <div className="ps-1 choose_par">
                      <h5>Security</h5>
                      <p>
                        Obtain complete control in online CRM with secured
                        access to apps and customer database while communicating
                        in multiple channels
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 ps-xl-2 pt-lg-0 pt-2 mt-lg-3 ps-lg-3">
                  <div className="first-card">
                    <div className="chose-box-img">
                      <img src={compatibility}></img>
                    </div>
                    <div className="ps-1 choose_par">
                      <h5>Compatibility</h5>
                      <p>
                        Work from any device with the Online CRM (100% cloud)
                        optimized for all modern web browsers and powered by
                        advanced technologies
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 ps-xl-5 pt-lg-0 pt-5 mt-lg-3 ps-lg-3">
                  <div className="first-card">
                    <div className="chose-box-img">
                      <img src={unBeatableValue}></img>
                    </div>
                    <div className="ps-1 choose_par">
                      <h5>Unbeatable Value</h5>
                      <p>
                        Most affordable Customer Relationship Management
                        Software. No per-app pricing and no paid Marketplace
                        apps.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 ps-xl-2 pt-lg-0 pt-2 mt-lg-3 ps-lg-3">
                  <div className="first-card">
                    <div className="chose-box-img">
                      <img src={CRM}></img>
                    </div>
                    <div className="ps-1 choose_par">
                      <h5>Amazing Customer Service CRM</h5>
                      <p>
                        World-Class Support - Phone, Email. Best Customer
                        Service CRM with 24x7 online support chat & email for
                        all plans. Continuously optimized user experience to
                        help end-users get the best out of our Customer
                        Management Software.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 ps-xl-5 pt-lg-0 pt-5 mt-lg-3 ps-lg-3">
                  <div className="first-card">
                    <div className="chose-box-img">
                      <img src={fastAgile}></img>
                    </div>
                    <div className="ps-1 choose_par">
                      <h5>Fast and Agile</h5>
                      <p>
                        An agile company with the ability to accelerate feature
                        development for our customers with the best Customer
                        Management Software. In-house services team and network
                        of partners available to deliver the implementation.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-3">
        <div className="container">
          <div className="dsa-benifit">
            <div>
              <img src={$_img}></img>
            </div>
            <h6>DSA Benifits</h6>
            <p>
              By using DSA.OS, we guarantee to increase your productivity and
              sales by more than 50% .
            </p>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 pt-lg-5">
              <div className="dsa_product">
                <div className="benifit_img">
                  <img src={benifit_img}></img>
                </div>
                <p>Single Dashboard</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 pt-lg-5">
              <div className="dsa_product">
                <div className="benifit_img1">
                  <img src={benifit_img1}></img>
                </div>
                <p>Real-Time View</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 pt-lg-5">
              <div className="dsa_product">
                <div className="benifit_img5">
                  <img src={benifit_img2}></img>
                </div>
                <p>Elegant features</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 pt-lg-5">
              <div className="dsa_product">
                <div className="benifit_img3">
                  <img src={benifit_img3}></img>
                </div>
                <p>Secure process</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 pt-lg-5 pt-sm-1">
              <div className="dsa_product">
                <div className="benifit_img3">
                  <img src={benifit_img4}></img>
                </div>
                <p>Centralized lead Generation</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 pt-lg-5 pt-sm-1">
              <div className="dsa_product">
                <div className="benifit_img5">
                  <img src={benifit_img5}></img>
                </div>
                <p>360° view of all loan applications</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 pt-lg-5 pt-sm-1">
              <div className="dsa_product">
                <div className="benifit_img1">
                  <img src={benifit_img6}></img>
                </div>
                <p>Faster deployment via mobile architecture</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 pt-lg-5 pt-sm-1">
              <div className="dsa_product">
                <div className="benifit_img">
                  <img src={benifit_img7}></img>
                </div>
                <p>Increased Engagement</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className='pt-lg-5 wallpaper_img'>
        <div className='container'>
          <div className='row justify-content-end choose-card-row'>
            <div className='col-xl-11 col-lg-11 col-md-12 col-sm-12'>
              <div className='row'>
                <div className='col-lg-6 col-md-12 col-sm-12'>
                  <div className='loan_info'>
                    <p className='easy-text'>EASY AND FAST</p>
                    <h6>Get Connect Instantly <span className='DSA-text'> DSA.OS</span></h6>
                    <p>DSA.OS is for The person/organization known as DSA works as a referral agent. Whether for a bank, NBFC or other Loan Consultant.</p>
                    <div className='pt-lg-5'>
                      <div className='apple_store pt-lg-5 pt-2'>
                        <div className='apple_store_img me-2'>
                          <img src={Apple}></img>
                        </div>
                        <div>
                          <a href='#' className='pt-lg-1 m-0'>GET IT ON</a>
                          <a href='#'>APPLE STORE</a>
                        </div>
                      </div>
                      <div className="apple_store pt-lg-5 pt-2">
                        <div className="robot_store_img me-2">
                          <img src={robot}></img>
                        </div>
                        <div>
                          <a href='#' className='pt-lg-1 m-0'>GET IT ON</a>
                          <a href='#'>PLAY STORE</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 col-md-12 col-sm-12 phone-img-wrap'>
                  <div className='phone_img'> <img src={phone_img} className='img-fluid'></img></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Information />
    </div>
  );
}

export default home;
