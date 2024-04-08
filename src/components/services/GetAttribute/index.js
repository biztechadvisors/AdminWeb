import api from "../../ApiConfig";
import { Apis } from "../../../config";
import { NotificationManager } from "react-notifications";
import { apiError } from "../../common";

const attributeAdd = async (data) => {
    try {
        let result = await api.post(Apis.AttributeAdd, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};

const attributeValuesAdd = async (data) => {
    try {
        let result = await api.post(Apis.AttributeValuesAdd, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};

const getAllAttribute = async (id) => {
    try {
        let result = await api.get(Apis.GetAllAttribute, { params: { id } });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};

const getAttribute = async (id, slug) => {
    try {
        let result = await api.get(Apis.GetAttribute, { params: { id, slug } });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};

const getDeleteAttributeValue = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteAttributeValue, { params: { id } });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};

const getDeleteAttribute = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteAttribute, { params: { id } });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};


const getBlogList = async () => {
    try {
        let result = await api.get(Apis.GetBlog);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};

const createBlogList = async (data) => {
    try {
        const result = await api.post(Apis.CreateBlog, data);

        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }

        return result.data;
    } catch (error) {
        apiError(error);
        // Re-throw the error to propagate it further if needed
        throw error;
    }
};

const updateBlogList = async (data) => {
    try {
        const result = await api.put(Apis.UpdateBlog, data);

        if (result.data && result.data.error) {
            NotificationManager.error(result.data.error);
            return { error: result.data.error };
        }
        return result.data;
    } catch (error) {
        apiError(error);
        throw error;
    }
};

const getBlogDelete = async (data) => {
    try {
        let result = await api.post(Apis.DeleteBlogByID, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};

const getAboutList = async () => {
    try {
        let result = await api.get(Apis.GetAbout);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};

const createAboutList = async (data) => {
    try {
        const result = await api.post(Apis.CreateAbout, data);

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

const updateAboutList = async (data) => {
    try {
        const result = await api.post(Apis.UpdateAbout, data);

        if (result.data && result.data.error) {
            NotificationManager.error(result.data.error);
            return { error: result.data.error };
        }
        return result.data;
    } catch (error) {
        apiError(error);
        throw error;
    }
};

const getAboutDelete = async (AboutId) => {
    try {
        const result = await api.delete(Apis.DeleteAbout, {
            data: { AboutId }, // Include AboutId in the request body
        });

        if (result.data.success) {
            NotificationManager.success(result.data.msg);
            return result.data;
        } else {
            NotificationManager.error(result.data.msg);
            return null;
        }
    } catch (error) {
        // Log the error or handle it appropriately
        console.error("Error deleting AboutUs:", error);
        NotificationManager.error("An error occurred while deleting AboutUs");
    }
};


const getPrivacyList = async () => {
    try {
        let result = await api.get(Apis.GetPrivacy);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};

const createPrivacyList = async (data) => {
    try {
        const result = await api.post(Apis.CreatePrivacy, data);

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

const updatePrivacyList = async (data) => {
    try {
        const result = await api.post(Apis.UpdatePrivacy, data);

        if (result.data && result.data.error) {
            NotificationManager.error(result.data.error);
            return { error: result.data.error };
        }
        return result.data;
    } catch (error) {
        apiError(error);
        throw error;
    }
};

const getPrivacyDelete = async (PrivacyId) => {
    try {
        const result = await api.delete(Apis.DeletePrivacy, {
            data: { PrivacyId },
        });

        if (result.data.success) {
            NotificationManager.success(result.data.msg);
            return result.data;
        } else {
            NotificationManager.error(result.data.msg);
            return null;
        }
    } catch (error) {
        // Log the error or handle it appropriately
        console.error("Error deleting AboutUs:", error);
        NotificationManager.error("An error occurred while deleting AboutUs");
    }
};


const getFAQList = async () => {
    try {
        let result = await api.get(Apis.GetFAQ);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error);
    }
};

const createFAQList = async (data) => {
    try {
        const result = await api.post(Apis.CreateFAQ, data);

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

const updateFAQList = async (data) => {
    try {
        const result = await api.post(Apis.UpdateFAQ, data);

        if (result.data && result.data.error) {
            NotificationManager.error(result.data.error);
            return { error: result.data.error };
        }
        return result.data;
    } catch (error) {
        apiError(error);
        throw error;
    }
};

const getFAQDelete = async (faqId) => {
    try {
        const result = await api.delete(Apis.DeleteFAQ, {
            data: { faqId },
        });

        if (result.data.success) {
            NotificationManager.success(result.data.msg);
            return result.data;
        } else {
            NotificationManager.error(result.data.msg);
            return null;
        }
    } catch (error) {
        // Log the error or handle it appropriately
        console.error("Error deleting AboutUs:", error);
        NotificationManager.error("An error occurred while deleting AboutUs")
    }
}
export default {
    attributeAdd,
    attributeValuesAdd,
    getAttribute,
    getAllAttribute,
    getDeleteAttributeValue,
    getDeleteAttribute,
    getBlogList,
    getBlogDelete,
    createBlogList,
    updateBlogList,
    getAboutList,
    getAboutDelete,
    createAboutList,
    updateAboutList,
    getPrivacyDelete,
    getPrivacyList,
    createPrivacyList,
    updatePrivacyList,
    getFAQList,
    getFAQDelete,
    updateFAQList,
    createFAQList,
}