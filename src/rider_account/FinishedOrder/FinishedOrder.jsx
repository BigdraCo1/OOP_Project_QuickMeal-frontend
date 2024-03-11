import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';

const BASE_URL = 'http://127.0.0.1:8000';

function RiderFinishedOrder() {
    const { rider_id } = useParams();
    const [riderProfile, setRiderProfile] = useState(null);


    async function fetchRiderProfile(rider_id) {
        try {
            const profile_response = await api.get(`${BASE_URL}/show/profile/${rider_id}`);
            if (profile_response.data) {
                setRiderProfile(profile_response.data);
            }
        }
        catch (error) {
            console.log('error', error);
        }
    }
    useEffect(() => {
        fetchRiderProfile(rider_id);

    }, [rider_id]);

    return (
        <>
            <div className='profile-container'>
                {riderProfile && (
                    <div>
                        <h2>Profile Information</h2>
                        <p>Username: {riderProfile.Username}</p>
                        <p>Fullname: {riderProfile.Fullname}</p>
                        <p>Email: {riderProfile.Email}</p>
                        <p>Phone: {riderProfile.Phone}</p>
                        <Link to={`/${rider_id}/pocket`}>
                            <button className="button">
                                Pocket
                            </button>
                        </Link>
                    </div>
                )}
            </div>
            <div>
                <h1>Finished Order</h1>
            </div>
        </>

    )
}

export default RiderFinishedOrder;