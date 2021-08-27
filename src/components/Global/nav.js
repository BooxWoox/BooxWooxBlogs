import React, { useState, useEffect } from "react";
import "./nav.css";
import logo from "../../assets/Logo.svg";
import dialCodes from '../Home/components/dial-codes';
import chevronDown from '../../assets/chevron-down.svg'
import x from '../../assets/x.svg'
import backArrow from '../../assets/back-arrow.svg'
import verticalLine from '../../assets/|.svg'
import userIcon from '../../assets/user.svg'
import pen from '../../assets/pen.svg'
import drafts from '../../assets/drafts.svg'
import logout from '../../assets/logout.svg'
import profPic from '../images/img-1.jpg'
import { Link } from "react-router-dom";
import { DragHandleOutlined } from "@material-ui/icons";
import axios from "axios";

import LoginModal from "./loginModal";

const user = null;

function Navbar() {
  // const [OTPToken, setOTPToken] = useState("");
  // const [loginToken, setLoginToken] = useState("");


  const [click, setClick] = useState(false);

  const iconChange = () => setClick((prevClick) => !prevClick);
  const closeSideMenu = () => setClick(false);

  const checkSideMenuSize = () => {
    if (window.innerWidth >= 800) {
      closeSideMenu();
    }
  };

  window.addEventListener("resize", checkSideMenuSize);
  window.addEventListener("scroll", closeSideMenu)

  const [showOverlay, setShowOverlay] = useState(false);
  // const [showLogin, setShowLogin] = useState(true);
  // const [showOTP, setShowOTP] = useState(false);
  // const [showCodesList, setShowCodesList] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUserMenuSide, setShowUserMenuSide] = useState(false);


  // const [showError,setShowError] = useState(false);
  // const [showOTPError,setShowOTPError] = useState(false);
  // const [dialCode, setDialCode] = useState("+91");

  // function handleLogin() {
  //   if(document.getElementById("input-pn").value.length < 10) {
  //     setShowError(true);
  //   }
  //   else {
  //     setPN(dialCode + document.getElementById("input-pn").value);
  //     axios({
  //       method: 'post',
  //       url: 'https://wz66sw2su9.execute-api.ap-south-1.amazonaws.com/Prod/sendauthotp',
  //       data: { "phone":{pn}}
  //     }).then(response => setOTPToken(response.token)).catch(err => err);
  //     console.log(pn);
  //     setShowLogin(false);
  //     setShowOTP(true);
  //     setShowError(false);
  //   }
  // }

  // function handleOTP() {
  //   if(document.getElementById("dig1").value == '' || document.getElementById("dig2").value == '' || document.getElementById("dig3").value == '' || document.getElementById("dig4").value == '') {
  //     setShowOTPError(true);
  //   }
  //   else {
  //     setOtp(document.getElementById("dig1").value + document.getElementById("dig2").value + document.getElementById("dig3").value + document.getElementById("dig4").value);
  //     console.log(otp);
  //     console.log(pn);
  //     axios({
    //       method: 'post',
    //       url: 'https://wz66sw2su9.execute-api.ap-south-1.amazonaws.com/Prod/verifyOtp',
    //       data: { {"otp":{otp}}},
    //       headers: {token: {OTPToken}}
    //     }).then(response => setOTPToken(response.token)).catch(err => err);
  //     setShowOTPError(false);
  //   }
  // }

  // const [otp,setOtp] = useState('');
  // const [pn,setPN] = useState('');
  // const [time, setTime] = useState(120);

  // function counter(id) {
  //   var timer = document.getElementById("time-left").innerText;
  //   timer = timer.split(':');
  //   var minutes = timer[0];
  //   var seconds = timer[1];
  //   if (minutes == 0 && seconds == 0) {
  //     setTime(0);
  //     document.getElementById("time-left").innerText = ('0' + ':' + '00');
  //     clearInterval(id);
  //     return;
  //   }
  //   else if (seconds <= 10 && seconds > 0) {
  //     seconds = '0' + --seconds;
  //   }
  //   else if(seconds == 0) {
  //     minutes--;
  //     seconds = 59;
  //   }
  //   else {
  //     seconds--;
  //   }

  //   document.getElementById("time-left").innerText = (minutes + ':' + seconds);
  //   setTime((minutes * 60) + seconds);
  // };

  // useEffect(() => {
  //   var timerID = setInterval(counter, 1000);
  //   if(time == 0) {
  //     clearInterval(timerID);
  //   }
  //   return () => {clearInterval(timerID)};
  // }, [])

  // function handleIt(item) {
  //   setDialCode(item.code);
  //   setShowCodesList(false);
  // }

  // function CodeList() {
  //   var itemHolder = [];
  //   dialCodes.map((item) =>
  //     itemHolder.push(
  //       <div id="code-item" onClick={() => {handleIt(item)}}>
  //         {item.code} {item.country}
  //       </div>
  //     )
  //   );
  
  //   return <div id={showCodesList ? "codes-list" : "codes-list-inactive"}>{itemHolder}</div>;
  // }

  return (
    <div>
    <div className="nav-container">
      <nav className="navbar">
        <div className="logo" onClick={closeSideMenu}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="menu-bar-icon" onClick={iconChange}>
          <i className={click ? "fa fa-times" : "fa fa-bars"} />
        </div>

        <div className="nav-row">
          <Link to="/features" className="nav-link" id="feat">
            Features
          </Link>
          <Link to="/blogs" className="nav-link" id="blog">
            Blogs
          </Link>
          <Link to="/downloads" className="nav-link" id="down">
            Downloads
          </Link>
          {!user ?
            <Link
              className="nav-link-side"
              id="log-side"
              onClick={() => {closeSideMenu(); setShowOverlay(!showOverlay)}}
            >
              Login
            </Link>
            : <div id="user-side">
                <div id="user" onClick={() => setShowUserMenu(!showUserMenu)}><img id="prof-pic" src={profPic} />{user}</div>
              </div>
          }
        </div>
        <div id={showUserMenu ? "user-menu" : "user-menu-inactive"} onBlur={() => {setShowUserMenu(false)}} tabIndex="0">
          <Link to="/" className="user-menu-item"> <img src={userIcon} class="icon"/>My Account</Link>
          <Link className="user-menu-item"> <img src={pen} class="icon"/>My Blogs</Link>
          <Link className="user-menu-item"> <img src={drafts} class="icon"/>My Drafts</Link>
          <Link className="user-menu-item"> <img src={logout} class="icon"/>Logout</Link>
        </div>
      </nav>
      <div id="side-menu-container">
        <ul className={click ? "side-menu-active" : "side-menu"}>
          <li className="side-menu-item">
            <Link
              to="/features"
              className="nav-link-side"
              onClick={closeSideMenu}
            >
              Features
            </Link>
          </li>
          <li className="side-menu-item">
            <Link
              to="/blogs"
              className="nav-link-side"
              id="blog-side"
              onClick={closeSideMenu}
            >
              Blogs
            </Link>
          </li>
          <li className="side-menu-item">
            <Link
              to="/downloads"
              className="nav-link-side"
              onClick={closeSideMenu}
            >
              Downloads
            </Link>
          </li>
          <li className="side-menu-item">
          {!user ?
            <Link
              className="nav-link-side"
              id="log-side"
              onClick={() => {closeSideMenu(); setShowOverlay(!showOverlay)}}
            >
              Login
            </Link>
            : <div id="side-user">
            <div id="username-side" onClick={() => setShowUserMenuSide(!showUserMenuSide)}><img id="prof-pic" src={profPic} />{user} <img id={showUserMenuSide ? "chevron-up-username" : "chevron-down-username"} src={chevronDown} /></div>
            {showUserMenuSide ? <div id="user-menu-side" onBlur={() => {setShowUserMenu(false)}} tabIndex="0">
              <Link to="/" className="user-menu-item"> <img src={userIcon} class="icon"/>My Account</Link>
              <Link className="user-menu-item"> <img src={pen} class="icon"/>My Blogs</Link>
              <Link className="user-menu-item"> <img src={drafts} class="icon"/>My Drafts</Link>
              <Link className="user-menu-item"> <img src={logout} class="icon"/>Logout</Link>
            </div> : null}
            </div>
          }
          </li>
        </ul>
      </div>

      {/* <div id={showOverlay ? "overlay" : "overlay-inactive"} onBlur={() => {setShowOverlay(false)}}>
      <div className="overlay-box" id={(showLogin && showOverlay) ? "log-sign-box" : "log-sign-box-inactive"}>
        <div id="log-sign">
          Login/Signup
          <img onClick={() => {setShowOverlay(false); setShowError(false)}} id="x" src={x} />
        </div>
        <div id="enter-your-pn">Enter your phone number</div>
        <div id="number-box">
          <div id="local-code" onClick={() => setShowCodesList(!showCodesList)}>
            <div id="text">{dialCode}</div>
            <img id={showCodesList ? "chevron-up" : "chevron-down"} src={chevronDown} />
            <img id="vertical-line" src={verticalLine} />
          </div>
          <input
            id="input-pn"
            type="tel"
            maxlength="10"
            placeholder="* * * * * * * * * *"
          />
        </div>
        <CodeList onBlur={() => setShowCodesList(false)} />
        <div id={showError ? "error-message" : "error-message-inactive"}>*The entered phone number must nescessarily have 10 digits</div>
        <div id="sendotp-btn"  onClick={handleLogin}><div>Send OTP</div></div>
      </div>

      <div className="overlay-box" id={(showOTP && showOverlay) ? "otp-box" : "otp-box-inactive"} >
        <div id="log-sign">
          <img id="back-arrow" src={backArrow} onClick={() => {setShowOTP(false); setShowLogin(true)}} />
          Login/Signup
        </div>
        <div id="enter-your-otp">Please enter the 4-digit OTP</div>
        <div id="your-pn">
          Sent on your phone number <div id="pn">xxxxxx7654</div>
        </div>
        <div id="input-otp">
          <input id="dig1" className="input-digit" type="number" maxlength="1" />
          <input id="dig2" className="input-digit" type="number" maxlength="1" />
          <input id="dig3" className="input-digit" type="number" maxlength="1" />
          <input id="dig4" className="input-digit" type="number" maxlength="1" />
        </div>
        <div id={showOTPError ? "error-message" : "error-message-inactive"}>*The OTP must nescessarily be of 4 digits</div>
        <div id={time != 0 ? "resend" : "resend-inactive"}>Resend in <div id="time-left">2:00</div></div>
        <div id={time == 0 ? "resend-otp" : "resend-inactive"}>Resend OTP</div>
        <div id="login-btn" onClick={handleOTP}><div>Login</div></div>
        
        <div id="tnc">
          By continuing, you agree to BooxWoox's Terms of Use and Privacy
          Policy
        </div>
      </div>
      </div> */}

    <LoginModal showOverlay={showOverlay} setShowOverlay={setShowOverlay} />


      </div> 

    </div>
  );
}

export default Navbar;