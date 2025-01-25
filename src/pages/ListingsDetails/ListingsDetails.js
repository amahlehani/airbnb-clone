import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ListingsDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`http://localhost:5000/listings/${id}`)
            .then((response) => {
                setListing(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("An error occurred while fetching the listing data.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    if (!listing) return <p>Listing not found.</p>;

    return (
        <div>
            <div className='results-container'>
                <div className="search-result">
                    <h1>{listing.title}</h1>
                    <img src={listing.images[0]} alt={listing.title} />
                    <p className="search-location">{listing.location}</p>
                    <p className="search-price">
                        <strong>R{listing.price} ZAR</strong> night
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ListingsDetails;