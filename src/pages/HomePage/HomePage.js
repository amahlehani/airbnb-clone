import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListings } from '../redux/actions/listingActions';
import ListingCard from '../components/Listings/ListingCard';

const HomePage = () => {
    const dispatch = useDispatch();
    const { listings, loading } = useSelector((state) => state.listings);

    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Featured Listings</h2>
            <div className='listings-container'>
                {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;