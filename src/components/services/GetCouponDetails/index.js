import api from "../../ApiConfig";
import { Apis } from "../../../config";
import { NotificationManager } from "react-notifications";
import { apiError } from "../../common";

const couponDiscCreate = async (formData) => {
  try {
    const response = await api.post(Apis.CouponDiscCreate, formData);
    const result = response.data;

    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }

    return result;
  } catch (error) {
    apiError(error);
  }
};


const getCouponDiscList = async () => {
  try {
    let result = await api.get(Apis.GetCouponDiscList);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const deleteProductFromCouponDisc = async (id) => {
  try {
    let result = await api.delete(Apis.DeleteProductFromCouponDisc, {
      params: { id: id },
    });
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const deleteCouponDisc = async (id) => {
  try {
    let result = await api.delete(Apis.DeleteCouponDisc, {
      params: { id: id },
    });
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const couponDiscUpdate = async (formData) => {
  try {
    let result = await api.put(Apis.CouponDiscUpdate, formData);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const couponDiscStatus = async (data) => {
  try {
    let result = await api.put(Apis.CouponDiscStatus, data);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

export default {
  couponDiscCreate,
  getCouponDiscList,
  deleteProductFromCouponDisc,
  couponDiscUpdate,
  couponDiscStatus,
  deleteCouponDisc,
};
