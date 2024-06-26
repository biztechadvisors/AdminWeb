import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';
import { getCookie } from '../../../function';
import {
    apiError
} from '../../common';
const getAllOrderList = async (data) => {
    try {
        let result = await api.post(Apis.GetAllOrderDetails, data);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getDetailAdmin = async () => {
    try {
        let result = await api.get(Apis.GetDetailAdmin);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getOrderStatusUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetOrderStatusUpdate, data);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};
const getOrderNotification = async () => {
    try {
        let result = await api.get(Apis.GetOrderNotification);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getDeleteOrder = async (list) => {
    try {
        let result = await api.post(Apis.GetDeleteOrder, list, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token')
            }
        });
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAllProductProfitList = async () => {
    try {
        let result = await api.get(Apis.GetAllProductProfitList, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token')
            }
        });
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

// Shiprocket Api's

const getOrderTrackingById = async (shipment_id) => {
    try {
        // Make the API request to fetch order tracking details by ID
        const result = await api.get(Apis.GetOrderTrackingById, {
            params: { shipment_id },
        });

        if (result.errors) {
            // Handle the API response errors
            NotificationManager.error(result.errors);
            return null;
        }

        return result.data;
    } catch (error) {
        // Handle the API request error
        apiError(error);
    }
};


const getAllOrdermatrix = async (data) => {
    console.log("first", data)
    try {
        let result = await api.post(Apis.GetAllOrdermatrix, data);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};


export default {
    getAllOrderList,
    getDetailAdmin,
    getOrderNotification,
    getOrderStatusUpdate,
    getAllProductProfitList,
    getDeleteOrder,
    getOrderTrackingById,
    getAllOrdermatrix
};