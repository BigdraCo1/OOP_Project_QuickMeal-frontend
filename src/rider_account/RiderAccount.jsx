import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/api';
import './RiderAccount.css';

const BASE_URL = 'http://127.0.0.1:8000';

function RiderAccount() {
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
        <div>
            <div className='profile-container'>
                {riderProfile && (
                    <div>
                        <h2 className='text-[1.6rem] font-bold'>Profile Information</h2>
                        <p>
                            <p className='text-[1.1rem] inline-block font-medium mr-2'>Username :</p>
                            <p className='text-[1.1rem] inline-block'>{riderProfile.Username}</p>
                        </p>
                        <p>
                            <p className='text-[1.1rem] inline-block font-medium mr-2'>Fullname :</p>
                            <p className='text-[1.1rem] inline-block'>{riderProfile.Fullname}</p>
                        </p>
                        <p>
                            <p className='text-[1.1rem] inline-block font-medium mr-2'>Email :</p>
                            <p className='text-[1.1rem] inline-block'>{riderProfile.Email}</p>
                        </p>
                        <p>
                            <p className='text-[1.1rem] inline-block font-medium mr-2'>Phone :</p>
                            <p className='text-[1.1rem] inline-block'>{riderProfile.Phone}</p>
                        </p>
                        <Link to={`/${rider_id}/pocket`}>
                            <button className="button">
                                Pocket
                            </button>
                        </Link>
                    </div>
                )}
            </div>
            <div className='button-container'>
                <Link to={`/rider_account/${ rider_id }/request_order`}>
                    <button>
                        Request Order
                    </button>
                </Link >
                <br />
                <Link to={`/rider_account/${ rider_id }/recieved_order`}>
                    <button>
                        Received Order
                    </button>
                </Link>
                <br />
                <Link to={`/rider_account/${ rider_id }/finished_order`}>
                    <button>
                        History Order
                    </button>
                </Link>

            </div>
        </div>
    )
}

export default RiderAccount;