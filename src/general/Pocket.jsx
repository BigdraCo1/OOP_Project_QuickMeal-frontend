import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const BASE_URL = 'http://127.0.0.1:8000';

function Pocket() {
    const { account_id } = useParams();
    const [pocket, setPocket] = useState({});
    const [payment, setPayment] = useState([]);

    async function fetchPocket(account_id) {
        try {
            const pocket_response = await api.get(`${BASE_URL}/show/pocket/${account_id}`);
            if (pocket_response.data) {
                setPocket(pocket_response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    async function fetchPayment(account_id) {
        try {
            const payment_response = await api.get(`${BASE_URL}/show/payment/${account_id}`);
            if (payment_response.data) {
                setPayment(payment_response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fetchPocket(account_id);
        fetchPayment(account_id);
    }, [account_id]);

    console.log(payment);
    return (
        <div className='flex mx-[10rem] px-[10rem] border-2 shadow-2xl 
        bg-slate-100 justify-start items-start h-screen'>
            <div className='p-[1rem] h-screen w-full'>
                <h1 className='text-[2rem] font-bold '>Pocket</h1>
                <div className='text-[1.2rem] border-2 border-slate-300 rounded-md shadow-md my-[0.5rem] px-[1rem] py-[0.5rem]'>
                    <p className='font-bold'>Balance : {pocket.Balance}</p>
                </div>
                <div className='text-[1.2rem] border-2 border-slate-300 rounded-md shadow-md px-[1rem] pb-[1rem]'>
                    <h2 className='py-[0.5rem] font-bold'>Payments</h2>
                    <ul className='rounded-md px-[1rem] py-[0.5rem] mb-[0.2rem] border-slate-600 border-2'>
                        {Object.keys(payment).map((paymentId) => (
                            <li 
                            className='rounded-md shadow-md mx-[0rem] my-[0.5rem] px-[1rem] py-[0.5rem] bg-slate-200 hover:bg-slate-300 transition-all duration-300 ease-in-out'
                            key={paymentId}>
                                <p className='font-bold'>Order ID: {payment[paymentId][0]}</p>
                                <p className='font-medium'>Status: {payment[paymentId][1]}</p>
                                <p className='font-medium'>Amount: {payment[paymentId][2]}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Pocket;
