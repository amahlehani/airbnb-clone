import React, { useRef, useState, useEffect } from 'react';
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SignIn from '../SignIn/SignIn';
import { fetchListings } from '../../redux/actions/listingActions';

const Navbar = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const popRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSignOut = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Handle clicks outside of the guest popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popRef.current && !popRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setShowGuestPopup(false); // Close popup if clicked outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleGuestChange = (operation) => {
    setGuestCount((prevCount) => {
      const newCount = operation === 'increment' ? prevCount + 1 : prevCount - 1;
      return Math.max(1, Math.min(20, newCount));
    })
  }

  const handleSearch = () => {
    if (searchQuery) {
      const queryParams = new URLSearchParams();

      const locationMatch = searchQuery.match(/location:\s*([^,\s]+)/);
      if (locationMatch) {
        queryParams.append("location_like", locationMatch[1]);
      }

      const priceMatch = searchQuery.match(/price:\s*(\d+)-(\d+)/);
      if (priceMatch) {
        queryParams.append("min_price", priceMatch[1]);
        queryParams.append("max_price", priceMatch[2]);
      }

      const dateMatch = searchQuery.match(
        /from:\s*(\d{4}-\d{2}-\d{2})\s*to:\s*(\d{4}-\d{2}-\d{2})/
      );
      if (dateMatch) {
        queryParams.append("start_date", dateMatch[1]);
        queryParams.append("end_date", dateMatch[2]);
      }

      const queryString = queryParams.toString();

      dispatch(fetchListings(queryString));

      navigate(`/search-results?${queryParams.toString()}`);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img
              src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png"
              className="navbar-logo"
              alt="logo"
            />
          </Link>
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
            {!isAuthenticated ? (
              <button className='account-circle' onClick={() => setIsModalOpen(true)}>
                <AccountCircleIcon fontSize="large" />
              </button>
            ) : (
              <button className='account-circle' onClick={handleSignOut}>
                <AccountCircleIcon fontSize="large" />
              </button>
            )}
          </div>
          {isModalOpen && <SignIn onClose={() => setIsModalOpen(false)} />}
        </div>
      </div>
      <div className="header-bottom">
        <div className="bottom-header-container">
          <div className="search-where">
            <p>Where</p>
            <div className="search-input">
              <input 
                type="text" 
                placeholder="Search destinations" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
            <button className="search-button" onClick={() => setShowGuestPopup(true)} ref={buttonRef}>
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
            <SearchIcon className="search-icon" onClick={handleSearch} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar