import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import $ from "jquery";
import { logo, headerbg } from '../images';
import InstallPWA from './InstallPWA';



function Header({ heading }) {
    const navigate = useNavigate();
    const userid = localStorage.getItem("user_id");
    const logout = () => {
        localStorage.clear();
        $(".close").click();
        toast.success("Logout successfully");
        navigate("/");
    };

    const username = localStorage.getItem("user_name")

    return (
        <><InstallPWA />
            <header style={{ backgroundImage: `url(${headerbg})`, backgroundRepeat: "no-repeat" }}>
                <div className="container">

                    <div className="row top-header align-items-center">

                        <div className="col-md-4">

                            <div className="menu menu-bl">
                                <input className="side-menu" type="checkbox" id="side-menu" />
                                <label className="hamb" htmlFor="side-menu"><span className="hamb-line"></span></label>
                                <ul className="pl-0 list-unstyled mb-0 d-flex align-items-center">
                                    {/* <li><a className='cursor text-white'onClick={()=>navigate('/')}>Home</a> </li> */}
                                    <li><a className='cursor text-white' onClick={() => navigate('/news')}>Read now</a> </li>
                                    <li><a href='https://news.digibyts.com/' className='cursor text-white'>Blog</a> </li>
                                    <li><a href='' className='cursor text-white moblieShow '>Advertise with Us</a> </li>
                                    <li><a className='cursor text-white moblieShow' onClick={() => navigate('/contact')}>Contact</a> </li>
                                    {/* {userid != null ? (
                                    <>
                                <li><a className='cursor text-white moblieShow' onClick={()=>logout()}>Logout</a> </li>
                                <li><a className='cursor text-white moblieShow' onClick={()=>navigate('/updateProfile')}>Profile</a> </li> 
                                </>
                                ) : (
                                <li><a className='cursor text-white moblieShow ' onClick={()=>navigate('/login')}>Login / Register</a> </li>
                                )} */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <Link to={'/'} className="logo">
                                <img src={logo} alt="logo" />
                            </Link>
                        </div>
                        {/* <div className="col-md-4 d-flex justify-content-end ">
                           
                            {userid != null ? (
                            <div className="dropdown desktopShow">
                            <button className="dropbtn desktopShow">{username}</button>
                            <div className="dropdown-content desktopShow">
                            <div className="menu menu-bl">
                                <ul className="pl-0 list-unstyled mb-0 align-items-center">
                                <li className='pb-2'><a className='cursor text-white menuOpt'onClick={()=>navigate('/news')}>Profile</a> </li>
                                <li><a className='cursor text-white menuOpt' onClick={() => logout()}>Logout</a></li>
                                </ul>
                            </div>
                          </div>
                          </div>
                            ) : (
                                <>
                             <button className="theme-outline-btn mx-3">Login</button>
                             <Link to={'/login'}>
                             <button className="theme-btn mx-3 desktopShow">Login / Register</button>
                             </Link>
                            
                             </>
                            )}
                          
                        </div> */}
                    </div>
                    <div className="banner-content">
                        <div className="row">
                            <div className="col-md-7 text-center mx-auto">
                                <h2>{heading}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header