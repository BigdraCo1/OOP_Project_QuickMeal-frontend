import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api'
import RiderHomeButton from '../RiderComponent/RiderHomeBurron';
import RiderProfileButton from '../RiderComponent/RiderProfileButton';

const BASE_URL = 'http://127.0.0.1:8000';

function RiderPocket() {
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

    async function TopUp() {
        const money = document.getElementById("money").value;

        if (!money) {
          alert("Please enter amount of money");
          return;
        }

        try { 
          const response = await api.post(`${BASE_URL}/show/pocket/topup/${account_id}/${money}`)
          alert(response.data);
          window.location.reload();
        } catch (error) {
          console.log("error",error)
        }
      }

    useEffect(() => {
        fetchPocket(account_id);
        fetchPayment(account_id);
    }, [account_id]);

    console.log(payment);
    return (
        <div className='flex mx-[10rem] px-[10rem] shadow-2xl 
        bg-slate-100 justify-start items-start h-screen'>
            <RiderHomeButton id={account_id}/>
            <RiderProfileButton id={account_id}/>
            <div className='p-[1rem] h-screen w-full'>

                <h1 
                className='text-white text-[2rem] font-bold bg-emerald-600 rounded-md border-2 px-[1rem] shadow-md'
                >
                    Pocket
                </h1>

                <div className='text-[1.2rem] font-medium border-2 border-slate-300 rounded-md shadow-md my-[0.5rem] px-[1rem] py-[0.5rem]'>
                    <p>Balance : {pocket.Balance}</p>
                </div>

                <div className='flex bg-slate-300 my-[0.5rem] p-[0.5rem] rounded-md w-full'>
                    <div className='inline w-9/12'>
                        <textarea 
                        className='w-full h-full border-2 border-slate-300 rounded-md p-[0.2rem] text-slate-800'
                        id="money" name="money" rows="1" cols="20"></textarea><br/>
                    </div>
                    <div className='inline w-3/12'>
                        <button 
                        className='w-full h-full text-center p-[0.2rem] text-[1.05rem] font-medium border-2 border-emerald-600 
                        bg-emerald-600 hover:bg-slate-100 text-slate-100 hover:text-emerald-600 rounded-md transition-all duration-300 ease-in-out'
                        onClick={() => TopUp()}>TopUp</button>
                    </div>
                </div>

                <div className='text-[1.2rem] border-2 border-slate-300 rounded-md shadow-md px-[1rem] pb-[1rem]'>
                    <h2 className='py-[0.5rem] font-medium'>Payments</h2>
                    <ul className='bg-slate-600 border-2 border-slate-300 rounded-lg px-[0.4rem] py-[0rem]'>
                        {Object.keys(payment).map((paymentId) => (
                            <li
                            className='text-[1rem] border-2 border-slate-300 rounded-md p-[0.4rem] my-[0.4rem] bg-slate-100 text-slate-800 font-medium'
                            key={paymentId}>
                                <p className='text-white bg-emerald-600 px-[0.4rem] py-[0.2rem] rounded-md'>Order ID : {payment[paymentId][0]}</p>
                                <p>Status : {payment[paymentId][1]}</p>
                                <p>Amount : {payment[paymentId][2]}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* <div className='bg-slate-300 p-[0.5rem] rounded-md absolute top-[6rem] right-[1rem]'>
                    <div>
                        <textarea 
                        className='border-2 border-slate-300 rounded-md p-[0.2rem] text-slate-800'
                        id="money" name="money" rows="1" cols="20"></textarea><br/>
                    </div>
                    <div>
                        <button 
                        className='w-full text-center p-[0.2rem] text-[1.05rem] font-medium border-2 border-emerald-600 
                        bg-emerald-600 hover:bg-slate-100 text-slate-100 hover:text-emerald-600 rounded-md transition-all duration-300 ease-in-out'
                        onClick={() => TopUp()}>TopUp</button>
                    </div>
                </div> */}

            </div>
        </div>
    );
}

export default RiderPocket;
