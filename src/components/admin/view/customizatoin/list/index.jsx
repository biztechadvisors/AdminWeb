import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./indexCustom.css"

export default function List() {
    const [custData, setCustData] = useState([]);
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/website/customization-List');
                setCustData(response.data.customization);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    function handleReadMessage(i) {
        setMessage(i)
    }

    return (
        <div className='container'>
            <div className='m-10'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {custData.map((item, i) => (
                            <tr key={i}>
                                <td >{item.name}</td>
                                <td >{item.phone}</td>
                                <td >{item.email}</td>
                                <td>
                                    {message !== i && <button className='bt-text' onClick={() => handleReadMessage(i)}>
                                        Read Message
                                    </button>}
                                    {message === i &&
                                        <div className='p-10 card1'>
                                            <div className='p-4'>{item.message}</div>
                                        </div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
