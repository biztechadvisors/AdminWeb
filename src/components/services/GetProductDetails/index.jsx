import api from "../../ApiConfig";
import { Apis } from "../../../config";
import { NotificationManager } from "react-notifications";
import { apiError } from "../../common";
const addProductList = async (data, config) => {
  try {
    let result = await api.post(Apis.AddProductList, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

export const uploadProductList = async (fileData) => {
  try {
    const result = await api.post(Apis.UploadProductList, fileData);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
    throw error;
  }
};

const getAllProductList = async (data) => {
  try {
    let result = await api.post(Apis.GetAllProductList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const searchAllProductList = async () => {
  try {
    let result = await api.get(Apis.SearchAllProductList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getFlashSaleProduct = async () => {
  try {
    let result = await api.get(Apis.GetFlashSaleProduct);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getAllProductPhoto = async (data) => {
  try {
    let result = await api.post(Apis.GetAllProductPhoto, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getUpdateProduct = async (data, config) => {
  try {
    let result = await api.post(Apis.GetUpdateProduct, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getUploadProductImage = async (data, config) => {
  try {
    let result = await api.post(Apis.GetUploadProductImage, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getUploadVarientPhoto = async (data, config) => {
  try {
    let result = await api.post(Apis.GetUploadVarientPhoto, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getDeleteProduct = async (id) => {
  try {
    let result = await api.delete(Apis.GetDeleteProduct, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getProductVarient = async (id) => {
  try {
    let result = await api.delete(Apis.GetProductVarient, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getProductById = async (id) => {
  try {
    let result = await api.get(Apis.GetProductById, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getProductPhotoDeleteById = async (data) => {
  try {
    let result = await api.post(Apis.GetProductPhotoDeleteById, {
      id: data.id,
      imgUrl: data.imgUrl,
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getAllProductPhotoList = async (data) => {
  try {
    let result = await api.post(Apis.GetAllProductPhotoList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getStatusUpdated = async (data) => {
  try {
    let result = await api.post(Apis.GetStatusUpdated, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getStockUpdated = async (data) => {
  try {
    let result = await api.post(Apis.GetStockUpdated, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getBannerUploadList = async (data, config) => {
  try {
    let result = await api.post(Apis.GetBannerUploadList, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getAllBannerList = async () => {
  try {
    let result = await api.get(Apis.GetAllBannerList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getDeleteBannerList = async (data) => {
  try {
    let result = await api.post(Apis.GetDeleteBannerList, {
      id: data.id,
      banner: data.banner,
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const createSeoForProduct = async (data) => {
  try {
    let result = await api.post(Apis.CreateSeoForProduct, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getBannerStatus = async (data) => {
  try {
    let result = await api.post(Apis.GetBannerStatus, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const createbrandList = async (data) => {
  try {
    let result = await api.post(Apis.CreatebrandList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const updatebrandList = async (data) => {
  try {
    let result = await api.post(Apis.UpdatebrandList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getAllBrandList = async (data) => {
  try {
    let result = await api.post(Apis.GetAllBrandList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getAllColorList = async (data) => {
  try {
    let result = await api.post(Apis.GetAllColorList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const createColorList = async (data) => {
  try {
    let result = await api.post(Apis.CreateColorList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const deleteColorList = async (id) => {
  try {
    let result = await api.delete(Apis.DeleteColorList, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const deletebrandList = async (data) => {
  try {
    let result = await api.post(Apis.DeletebrandList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getAllSellerProduct = async (data) => {
  try {
    let result = await api.get(Apis.GetAllSellerItem, { params: data });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getImageDetailList = async (data) => {
  try {
    let result = await api.get(Apis.GetImageDetailList, { params: data });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const updateCommonName = async (data) => {
  try {
    let result = await api.put(Apis.UpdateCommonName, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const createFlashSale = async (data) => {
  try {
    let result = await api.post(Apis.CreateFlashSale, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const createProcessor = async (data) => {
  try {
    let result = await api.post(Apis.CreateProcessor, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getProcessorList = async (data) => {
  try {
    let result = await api.post(Apis.GetProcessorList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const deleteProcessorList = async (id) => {
  try {
    let result = await api.delete(Apis.DeleteProcessorList, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const updateColorList = async (data) => {
  try {
    let result = await api.post(Apis.UpdateColorList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getSingeImageUpload = async (data, config) => {
  try {
    let result = await api.put(Apis.GetSingeImageUpload, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const uploadMainProdImage = async (data, config) => {
  try {
    let result = await api.put(Apis.UploadMainProdImage, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const deleteMainProdImage = async (formData) => {
  try {
    let result = await api.put(Apis.GetdeleteMainProdImage, formData);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getMultipleImageUpload = async (data, config) => {
  try {
    let result = await api.post(Apis.GetMultipleImageUpload, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getThumbnailDelete = async (data) => {
  try {
    let result = await api.put(Apis.GetThumbnailDelete, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getMultipleImageDelete = async (data) => {
  try {
    let result = await api.post(Apis.GetMultipleImageDelete, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

export default {
  addProductList,
  uploadProductList,
  getAllProductList,
  getUpdateProduct,
  getDeleteProduct,
  getStockUpdated,
  getProductVarient,
  getUploadProductImage,
  getAllProductPhoto,
  getProductById,
  getImageDetailList,
  updateCommonName,
  getStatusUpdated,
  getBannerUploadList,
  getAllBannerList,
  getAllProductPhotoList,
  searchAllProductList,
  getProductPhotoDeleteById,
  createSeoForProduct,
  getUploadVarientPhoto,
  getBannerStatus,
  getDeleteBannerList,
  createbrandList,
  createFlashSale,
  getAllSellerProduct,
  getAllBrandList,
  deletebrandList,
  updatebrandList,
  getFlashSaleProduct,
  getAllColorList,
  createColorList,
  deleteColorList,
  createProcessor,
  getProcessorList,
  deleteProcessorList,
  updateColorList,
  getSingeImageUpload,
  getMultipleImageUpload,
  getThumbnailDelete,
  getMultipleImageDelete,
  uploadMainProdImage,
  deleteMainProdImage
};
