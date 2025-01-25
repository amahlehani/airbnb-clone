import React from 'react';
import './Footer.css';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer-terms'>
            <div className='footer-term-items'>
                <p className='footer-head'>Support</p>
                <p>Help Center</p>
                <p>AirCover</p>
                <p>Anti-discrimination</p>
                <p>Disability support</p>
                <p>Cancellation options</p>
                <p>Report neighbourhood concern</p>
            </div>
            <div className='footer-term-items'>
                <p className='footer-head'>Hosting</p>
                <p>Airbnb your home</p>
                <p>AirCover for Hosts</p>
                <p>Hosting resources</p>
                <p>Community forum</p>
                <p>Hosting responsibly</p>
                <p>Join a free Hosting class</p>
                <p>Find a co-host</p>
            </div>
            <div className='footer-term-items'>
                <p className='footer-head'>Airbnb</p>
                <p>Newsroom</p>
                <p>New features</p>
                <p>Careers</p>
                <p>Investors</p>
                <p>Airbnb.org emergency stays</p>
            </div>
        </div>
        <div className='footer-copyright'>
            <div className='copyright'>
                <p>© 2025 Airbnb Clone, Amahle Hani.</p>
                <p>.  Privacy  .  Terms  .  Sitemap</p>
            </div>
            <div className='footer-icons'>
                <LanguageOutlinedIcon fontSize="small" />
                <p>English</p>
            </div>
        </div>
    </div>
  )
}

export default Footer