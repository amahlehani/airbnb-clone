import React, { useRef, useState } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Navbar = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const popRef = useRef(null);

  const handleGuestChange = (operation) => {
    setGuestCount((prevCount) => {
      const newCount = operation === 'increment' ? prevCount + 1 : prevCount - 1;
      return Math.max(1, Math.min(20, newCount));
    })
  }

  return (
    <>
      <div className="navbar">
        <div className="logo-container">
          <img
            src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png"
            className="navbar-logo"
            alt="logo"
          />
        </div>
        <div className="middle-container">
          <Link to="/">Stays</Link>
          <Link to="/">Experiences</Link>
        </div>
        <div className="links-container">
          <Link to="/" className="home-link">
            Airbnb your home
          </Link>
          <LanguageOutlinedIcon fontSize="small" />
          <div className="menu-profile">
            <MenuOutlinedIcon fontSize="small" />
            <AccountCircleIcon fontSize="large" />
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="bottom-header-container">
          <div className="search-where">
            <p>Where</p>
            <div className="search-input">
              <input type="text" placeholder="Search destinations" />
            </div>
          </div>
          <div className="checkin-date">
            <p>Check in</p>
            <DatePicker className='date-picker' selected={checkInDate} onChange={(date) => setCheckInDate(date)} placeholderText='Add date' />
          </div>
          <div className="checkout-date">
            <p>Check out</p>
            <DatePicker className='date-picker' selected={checkOutDate} onChange={(date) => setCheckOutDate(date)} placeholderText='Add date' />
          </div>
          <div className="guest-counter">
            <p>Who</p>
            <button className="search-button" onClick={() => setShowGuestPopup(true)}>
              {guestCount > 0 ? `${guestCount} guests` : `${guestCount} guest`}
            </button>
            {showGuestPopup && (
              <div className='guest-popup' ref={popRef}>
                <div className='guest-selector'>
                  <button className='guest-btn' onClick={() => handleGuestChange("decrement")}>
                    <RemoveIcon />
                  </button>
                  <input type='number' value={guestCount} readOnly className='guest-input'/>
                  <button className='guest-btn' onClick={() => handleGuestChange("increment")}>
                    <AddIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="search-icon-container">
            <SearchIcon className="search-icon" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar