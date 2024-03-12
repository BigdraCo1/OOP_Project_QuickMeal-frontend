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

    async function TopUp() {
        const money = document.getElementById("money").value;

        if (!money) {
          alert("Please enter amount of money");
          return;
        }

        try { 
          const response = await api.post(`${BASE_URL}/show/pocket/topup/${account_id}/${money}`)
          alert(response.data)
          window.location.reload();
        } catch (error) {
          console.log("error",error)
        }
      };

    useEffect(() => {
        fetchPocket(account_id);
        fetchPayment(account_id);
    }, [account_id]);

    console.log(payment);
    return (
        <div>
            <h1>Pocket</h1>
            <div>
                <p>Balance: {pocket.Balance}</p>
            </div>
            <div>
                <h2>Payments</h2>
                <ul>
                    {Object.keys(payment).map((paymentId) => (
                        <li key={paymentId}>
                            <p>Order ID: {payment[paymentId][0]}</p>
                            <p>Status: {payment[paymentId][1]}</p>
                            <p>Amount: {payment[paymentId][2]}</p>
                        </li>
                    ))}
                </ul>
                <div> <textarea id="money" name="money" rows="1" cols="20"></textarea><br/> </div>
                <div> <button onClick={() => TopUp()}>TopUp</button> </div>
            </div>
        </div>
    );
}

export default Pocket;
