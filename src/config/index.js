const API_URL =
  document.domain === "localhost"
    ? "http://localhost:5050"
    : "https://souqarena.com";

const Apis = {
  //Authentication api
  GetUserLogin: `${API_URL}/api/auth/rootLogin`,
  GetUserRegsiter: `${API_URL}/api/auth/register`,
  GetAllUserList: `${API_URL}/api/auth/user/getAllUserList`,
  GetUserUpdate: `${API_URL}/api/auth/user/update`,
  GetDeleteUserList: `${API_URL}/api/auth/user/delete`,

  //Dashboard
  GetOrderByStatus: `${API_URL}/api/order/status`,
  GetAllStatusOrder: `${API_URL}/api/order/count`,

  //Vendor api
  CreateSupplierList: `${API_URL}/api/vendor/create`,
  CreateSupplierProduct: `${API_URL}/api/vendor/product-add`,
  GetAllSellerList: `${API_URL}/api/vendor/list`,
  GetUpdateSellerList: `${API_URL}/api/vendor/update`,
  GetDeleteSellerList: `${API_URL}/api/vendor/delete`,
  GetVendorProductList: `${API_URL}/api/vendor/product-list`,
  GetProductByVendor: `${API_URL}/api/vendor/product/getAllProductById`,
  DeleteProductByVendorList: `${API_URL}/api/vendor/product-delete`,
  GetNewVendorList: `${API_URL}/api/vendor/sellar/website-list`,
  GetAllSellerProductList: `${API_URL}/api/seller/all-product-list`,
  GetAllSellerItem: `${API_URL}/api/seller/history-product`,
  productUpdate: `${API_URL}/api/seller/admin/product/update`,
  UpdateBrandByPrice: `${API_URL}/api/seller/brand/product/price`,
  GetImageDetailList: `${API_URL}/api/seller/admin/product/search`,
  UpdateCommonName: `${API_URL}/api/seller/common-name`,

  //location api
  GetAllLocationCreate: `${API_URL}/api/location/create`,
  GetAllLocationList: `${API_URL}/api/location/list`,
  GetLocationDeleteById: `${API_URL}/api/location/delete`,
  GetLocationUpdate: `${API_URL}/api/location/update`,

  //area api
  CreateCityList: `${API_URL}/api/location/area/create`,
  GetCityList: `${API_URL}/api/location/area/list`,
  GetCityDeleteById: `${API_URL}/api/location/area/delete`,
  GetCityUpdate: `${API_URL}/api/location/area/update`,
  GetAllAreaByLocation: `${API_URL}/api/location/area/getAllAreaList?locationId=`,

  //category api
  CreateCategoryList: `${API_URL}/api/category/create`,
  GetAllCategoryList: `${API_URL}/api/category/admin/main-list`,
  GetUpdateCategoryList: `${API_URL}/api/category/main-list/update`,
  CreateSuperCategory: `${API_URL}/api/category/super-create`,
  UpdateSuperCategory: `${API_URL}/api/category/super-update`,
  GetSuperCategoryList: `${API_URL}/api/category/super-list`,
  GetSuperCatDelete: `${API_URL}/api/category/super/delete`,
  GetMainDeleteById: `${API_URL}/api/category/main/delete`,
  //Sub category api
  CreateSubCategoryList: `${API_URL}/api/category/create-sub`,
  GEtAllSubCategoryList: `${API_URL}/api/category/sub-list`,
  GetUpdateSubCategoryList: `${API_URL}/api/category/sub-list/update`,
  GetSubDeleteById: `${API_URL}/api/category/sub-list/delete`,

  //Child category api
  GetAllSubCategory: `${API_URL}/api/category/getAllSubCategory?categoryId=`,
  CreateChildCategory: `${API_URL}/api/category/create-sub-child`,
  GetAllChildCategoryList: `${API_URL}/api/category/child-list`,
  GetChildDeleteById: `${API_URL}/api/category/child/deleteById`,
  GetAllSubChildCategory: `${API_URL}/api/category/getAllSubChildCategory?subcategoryId=`,
  GetUpdateChildCat: `${API_URL}/api/category/child/update`,

  //product api
  AddProductList: `${API_URL}/api/product/add`,
  UploadProductList: `${API_URL}/api/product/uploadPro`,
  GetAllProductList: `${API_URL}/api/product/getAllproductList`,
  GetAllProductPhoto: `${API_URL}/api/product/getAllPhoto`,
  GetUpdateProduct: `${API_URL}/api/product/update`,
  GetUploadProductImage: `${API_URL}/api/product/upload-img`,
  GetUploadVarientPhoto: `${API_URL}/api/product/upload/varient-img`,
  GetDeleteProduct: `${API_URL}/api/product/delete`,
  GetProductById: `${API_URL}/api/product/getProductById`,
  GetProductPhotoDeleteById: `${API_URL}/api/product/aws/delete/photo`,
  SearchAllProductList: `${API_URL}/api/product/search/getAllproductList`,
  GetProductVarient: `${API_URL}/api/product/varients-delete`,
  GetAllProductPhotoList: `${API_URL}/api/product/getAllPhotoById`,
  GetStatusUpdated: `${API_URL}/api/product/status/update`,
  GetStockUpdated: `${API_URL}/api/product/update-stock`,
  GetBannerUploadList: `${API_URL}/api/product/banner-upload`,
  GetAllBannerList: `${API_URL}/api/product/admin/banner-list`,
  GetBannerStatus: `${API_URL}/api/product/banner-status`,
  GetDeleteBannerList: `${API_URL}/api/product/banner-delete`,
  CreatebrandList: `${API_URL}/api/product/brand-create`,
  GetAllBrandList: `${API_URL}/api/product/brand-list`,
  UpdatebrandList: `${API_URL}/api/product/brand-update`,
  DeletebrandList: `${API_URL}/api/product/brand-delete`,
  CreateColorList: `${API_URL}/api/product/color/create`,
  UpdateColorList: `${API_URL}/api/product/color-update`,
  GetAllColorList: `${API_URL}/api/product/color/list`,
  DeleteColorList: `${API_URL}/api/product/color/delete`,
  GetFlashSaleProduct: `${API_URL}/api/product/getAllList`,

  // Image Upload and delete of product from adminusing seller node
  GetSingeImageUpload: `${API_URL}/api/seller/image/single-upload`,
  GetThumbnailDelete: `${API_URL}/api/seller/image/delete`,
  GetMultipleImageUpload: `${API_URL}/api/product/upload/varient-img`,
  GetMultipleImageDelete: `${API_URL}/api/product/aws/delete/photo`,

  UploadMainProdImage: `${API_URL}/api/seller/image/main-upload`,
  GetdeleteMainProdImage: `${API_URL}/api/seller/image/main-delete`,


  // seo details
  CreateSeoForProduct: `${API_URL}/api/product/seo-create`,

  //order detail
  GetDeleteOrder: `${API_URL}/api/order/delete-list`,
  GetAllOrderDetails: `${API_URL}/api/order/list`,
  GetOrderStatusUpdate: `${API_URL}/api/order/status/update`,
  GetOrderNotification: `${API_URL}/api/order/notifications`,
  GetDetailAdmin: `${API_URL}/api/order/totalDash-list`,

  // business details
  GetAllProductProfitList: `${API_URL}/api/business/getAllProductProfit`,

  // customer details
  GetAllCustomerDetails: `${API_URL}/api/customer/list`,
  GetCustomerDeleteById: `${API_URL}/api/customer/delete`,

  //seo detail
  GetAllSeoList: `${API_URL}/api/seo/list`,
  GetDeleteList: `${API_URL}/api/seo/delete`,
  GetSeoUpdate: `${API_URL}/api/seo/update`,
  GetSeoSearch: `${API_URL}/api/seo/search-by-productid`,

  //parlour api
  GetCreateSalonCategory: `${API_URL}/api/salon/category-create`,
  GetAllSalonList: `${API_URL}/api/salon/category-list`,
  GetSalonUpdate: `${API_URL}/api/salon/category-update`,
  GetServiceCreate: `${API_URL}/api/salon/service-create`,
  GetServiceList: `${API_URL}/api/salon/service-list`,
  GetServiceUpdate: `${API_URL}/api/salon/service-update`,
  GetServiceListByGender: `${API_URL}/api/salon/filter/category-gender`,
  DeleteCategoryList: `${API_URL}/api/salon/category-delete`,
  GetServiceDeleteFromSalon: `${API_URL}/api/salon/service-delete`,
  CreateSalonDetails: `${API_URL}/api/salon/create-parlour`,
  UpdateSalonDetails: `${API_URL}/api/salon/update-parlour`,
  GetAllSalonOwner: `${API_URL}/api/salon/parlour/getAllParlourList`,
  GetParlourStatus: `${API_URL}/api/salon/parlour-status-update`,
  GetParlourOrderList: `${API_URL}/api/salon/order/list`,

  //collection
  CreateCollection: `${API_URL}/api/collection/create`,
  GetCollection: `${API_URL}/api/collection/list`,
  GetCollectionUpdate: `${API_URL}/api/collection/update`,
  CreateItemCollection: `${API_URL}/api/collection/item`,
  GetItemList: `${API_URL}/api/collection/item/list`,
  DeleteItem: `${API_URL}/api/collection/item/delete`,
  CreateFlashSale: `${API_URL}/api/collection/flash-sale`,
  GetFlashSale: `${API_URL}/api/collection/flash-sale-list`,
  DeleteProductFromFlash: `${API_URL}/api/collection/flash-sale-delete`,
  UpdateProductFromFlash: `${API_URL}/api/collection/flash-sale-update`,
  UpdateFlashStatus: `${API_URL}/api/collection/flash-sale-status-update`,

  //processor
  CreateProcessor: `${API_URL}/api/product/processor-create`,
  GetProcessorList: `${API_URL}/api/product/processor-list`,
  DeleteProcessorList: `${API_URL}/api/product/processor-delete`,

  // Coupon Discount 

  CouponDiscCreate: `${API_URL}/api/couponDiscount/coupon-create`,
  GetCouponDiscList: `${API_URL}/api/couponDiscount/coupon-list`,
  DeleteProductFromCouponDisc: `${API_URL}/api/couponDiscount/coupon-delete`,
  DeleteCouponDisc: `${API_URL}/api/couponDiscount/couponDesc-delete`,
  CouponDiscUpdate: `${API_URL}/api/couponDiscount/coupon-update`,
  CouponDiscStatus: `${API_URL}/api/couponDiscount/coupon-status`,


  // Apply-Coupon-Code

  ApplyCouponCode: `${API_URL}/api/couponDiscount/apply-coupon`,

  GetOrderTrackingById: `${API_URL}/api/order/track-order`,

};
export { API_URL, Apis };
