import { GetOrderDetails } from "../../services";
import React, { useState, useEffect } from "react";
import "./adminDetail.css";

const AdminDetail = () => {
    const [data, setData] = useState();

    const getOrderList = async () => {
        const response = await GetOrderDetails.getDetailAdmin();
        console.log("first", response)
        setData(response);
    };
    console.log("second", data)

    useEffect(() => {
        getOrderList();
    }, []);

    return (
        <div className="admin-panel">
            {data ? (
                data.map((item, index) => (
                    <div className="data-card" key={index}>
                        <h3>{item.name}</h3>
                        <p>{item.value}</p>
                    </div>
                ))
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default AdminDetail;
