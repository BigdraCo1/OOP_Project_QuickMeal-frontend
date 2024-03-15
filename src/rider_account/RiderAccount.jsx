import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/api';
import './RiderAccount.css';
import RiderProfileButton from './RiderComponent/RiderProfileButton';
import RiderHomeButton from './RiderComponent/RiderHomeButton';

const BASE_URL = 'http://127.0.0.1:8000';

function RiderAccount() {
    const { rider_id } = useParams();
    const [riderProfile, setRiderProfile] = useState(null);

    return (
        <div
        className='flex justify-center h-screen'
        >
            <div className="flex justify-between items-center">
                <RiderProfileButton id={rider_id} />
                <RiderHomeButton id={rider_id} />
            </div>

            <div
            // className='button-container'
            className='p-[1rem] flex flex-col justify-center items-center h-full w-5/12 rounded-md'
            >

                <div className='w-full'>
                    <h1
                    className='text-3xl font-bold text-center bg-slate-500 rounded-lg p-[1rem] my-[1rem] text-white w-full'
                    >Welcome to Rider HomePage</h1>
                </div>

                <div className='w-full rounded-lg bg-slate-200 text-center p-[1rem] font-medium text-[1.2rem]'>
                <Link to={`/rider_account/${ rider_id }/request_order`}>
                    <button>
                        Request Order
                    </button>
                </Link >
                </div>

                <br />

                <div className='w-full rounded-lg bg-slate-200 text-center p-[1rem] font-medium text-[1.2rem]'>
                <Link to={`/rider_account/${ rider_id }/recieved_order`}>
                    <button>
                        Received Order
                    </button>
                </Link>
                </div>

                <br />

                <div className='w-full rounded-lg bg-slate-200 text-center p-[1rem] font-medium text-[1.2rem]'>
                <Link to={`/rider_account/${ rider_id }/finished_order`}>
                    <button>
                        History Order
                    </button>
                </Link>
                </div>
            </div>

        </div>
    )
}

export default RiderAccount;