import React from 'react';
import './SearchResults.css';
import { useSelector } from 'react-redux';

const SearchResults = () => {
    const { listings, loading } = useSelector((state) => state.listings);

    if (loading) return <p>Loading...</p>
    if (!listings.length) return <p>No results found.</p>

    return (
        <div>
            <div className='results-container'>
                {listings.map((listing) => (
                    <div className='search-result'>
                        <h1>{listing.title}</h1>
                        <img src={listing.images[0]} alt={listing.title} />
                        <p className='search-location'>{listing.location}</p>
                        <p className='search-price'><strong>R{listing.price} ZAR</strong> night</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;