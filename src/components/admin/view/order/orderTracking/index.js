import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { GetOrderDetails } from "../../../../services";
import { useLocation } from "react-router-dom";

const OrderTracking = () => {
  const [trackingDetails, setTrackingDetails] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const shipment_id = location.state.shipment_id;

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const response = await GetOrderDetails.getOrderTrackingById(shipment_id);
        if (response) {
          setTrackingDetails(response);
        }
      } catch (error) {
        console.error("Error fetching tracking details:", error);
        setError("Error fetching tracking details. Please try again later.");
      }
    };

    fetchTrackingDetails();
  }, [shipment_id]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        trackingDetails.length > 0 && (
          <div>
            <h2>Order Tracking Details</h2>
            <p>Tracking ID: {trackingDetails.trackingId}</p>
            <p>Current Status: {trackingDetails.currentStatus}</p>
            <p>Estimated Delivery Date: {trackingDetails.estimatedDeliveryDate}</p>
            <p>Shipment Progress:</p>
            <ul>
              {trackingDetails.progress.map((event, index) => (
                <li key={index}>
                  <p>{event.timestamp}</p>
                  <p>{event.location}</p>
                  <p>{event.status}</p>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default OrderTracking;
