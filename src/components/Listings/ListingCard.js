import React from 'react';
import './ListingCard.css';

const ListingCard = ({ listing }) => {
  return (
    <div className='listing-card'>
        <img src={listing.images[0]} alt={listing.title} />
        <p className='listing-title'>{listing.title}</p>
        <p className='listing-location'>{listing.location}</p>
        <p className='listing-price'><strong>R{listing.price} ZAR</strong> night</p>
    </div>
  )
}

export default ListingCard