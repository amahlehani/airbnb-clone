import React, { useEffect } from 'react';
import './HomePage.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchListings } from '../../redux/reducers/listingReducer';
import ListingCard from '../../components/Listings/ListingCard';
import Banner from '../../components/Banner/Banner';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const { listings, loading } = useSelector((state) => state.listings);

    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Banner />
            <div className='listings-container'>
                {listings.map((listing) => (
                    <Link to={`/listings/${listing.id}`} key={listing.id} className='listing-link'>  
                        <ListingCard listing={listing} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HomePage;