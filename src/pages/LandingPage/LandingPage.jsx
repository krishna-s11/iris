import React from 'react'
import "./landingPage.css";
import Navbar from '../../components/Navbar/Navbar';
import Spline from '@splinetool/react-spline';
import HeroImg from "../../assets/hero2.webp"
import Section3Img from "../../assets/section3.png";
import chainVid from "../../assets/chain1.mov"
import section5Img from "../../assets/section5.webp"
import longline from "../../assets/longline.webp";
import phase1 from "../../assets/Phase 1.png";
import phase2 from "../../assets/Phase 2.png";
import phase3 from "../../assets/Phase 3.png";
import logo from "../../assets/logo.webp";
import telegram from "../../assets/telegram.webp"
import twitter from "../../assets/twitter.webp"
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Navbar />
        <div className='hero'>
            <div className='hero_content'>
                <h1>
                    AI Built For Unmatched Market Precision
                </h1>
                <p>Harness the power of precise deep learning and advanced machine learning models built to analyze markets in real time, execute flawless trades, and adapt to every shift with unmatched precision.</p>
                <button className='btn_contactus btn_register' onClick={() => {navigate("/auth/register")}}>Register Now</button>
            </div>
            <div className='hero_image'>
            <Spline scene="https://prod.spline.design/E5AgYeajlmsOmY0z/scene.splinecode" className='hero_three'/>
            </div>
        </div>
        <div className='section2'>
            <h1>
                Autopilot Your Profits with AI
            </h1>
            <img src={HeroImg} srcset="" className='section2_img' />
            <p>Our AI trading engine is powered by cutting-edge deep learning and machine learning models, meticulously trained for precision and speed. It analyzes vast amounts of market data in real time, identifies high-probability opportunities, and executes trades with surgical accuracy. Designed for traders who demand more than just automation, this is intelligent trading,
            built for precision and built to win.</p>
        </div>
        <div className='section3'>
            <video src={chainVid} autoPlay loop muted playsInline preload='auto' />
        </div>
        <div className='section4'>
            <h1>Built to Outperform</h1>
            <p>Gain full control of your trading journey with intelligent automation that never sleeps. From dynamic portfolio management that adjusts to market shifts, to real-time wallet tracking and seamless execution - every feature is engineered to simplify complexity, amplify performance and keep you in sync with the ever-evolving world of crypto markets.</p>
            <img src={Section3Img} alt="" srcset="" />
        </div>
        <div className='section5'>
            <div className='section5_header'>
                <h1>The Market Never Sleeps. Neither Does Octifi</h1>
                <p>The greatest tools in web3 just a message away. Removing the barriers of education, and capability.</p>
                <button className='btn_contactus'>Get Started</button>
            </div>
            <img src={section5Img} alt="" srcset="" className='section5_img'/>
            <img src={longline} alt="" srcset="" className='longline' />
        </div>
        <div className='section6'>
            <div className='section6_holder'>
                <div className='section6_top'>
                    <div>
                        <h1>Development Road</h1>
                        <p>From core innovation to future breakthroughs - explore how Octifi is evoloving one intelligent milestone at a time.</p>
                        <button className='btn_contactus'>Find More</button>
                    </div>
                    <img src={phase1} alt="" srcset="" />
                </div>
                <div className='section6_bottom'>
                        <img src={phase3} alt="" srcset="" />
                        <img src={phase2} alt="" srcset="" id="phase3" />
                </div>
            </div>
        </div>
        <div className='footer'>
                <div className='footer_left'>
                    <img src={logo} alt="" srcset="" />
                    <p>©2025 All Rights Reserved</p>
                </div>
                <div className='footer_right'>
                        <ul>
                            <li>About Us</li>
                            <li>View Docs</li>
                            <li>Litepaper</li>
                        </ul>
                        <div className='footer_right2'>
                            <img src={longline} alt="" srcset="" className='shortline'/>
                            <div className='image_holder'>
                                <img src={telegram} alt="" srcset="" className='telegram'/>
                                <img src={twitter} alt="" srcset="" className='twitter'/>
                            </div>
                        </div>
                </div>
        </div>
    </div>
  )
}

export default LandingPage