import React, { useState, useEffect } from "react";
import { GetCouponDetails, GetProductDetails } from "../../../../services";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import swal from "sweetalert";
import { NotificationManager } from "react-notifications";
import RichTextEditor from "../../../../RichTextEditor";

const Create = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dropDownOpt, setDropDownOpt] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discountType, setDiscountType] = useState("totalAmount");
  const [discount, setDiscount] = useState("");
  const [content, setContent] = useState("");
  const [discountPer, setDiscountPer] = useState("");
  const [onShopping, setOnShopping] = useState("");
  const [discountOption, setDiscountOption] = useState("discount");


  const handleBack = () => {
    window.history.goBack();
  };

  useEffect(() => {
    renderData();
  }, []);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const onFileChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const renderData = async () => {
    try {
      const response = await GetProductDetails.getFlashSaleProduct();
      if (response && response.data) {
        setDropDownOpt(response.data);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    const value = selectedList.map((option) => option.id);
    setProductIds(value);
  };

  const onRemove = (selectedList, removedItem) => {
    const value = selectedList.map((option) => option.id);
    setProductIds(value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
  };

  const handleGenerateCouponCode = () => {
    const generatedCode = generateCouponCode();
    setCouponCode(generatedCode);
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const handleDiscountOptionChange = (e) => {
    setDiscountOption(e.target.value);
  };

  const generateCouponCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const length = 10;
    let couponCode = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters.charAt(randomIndex);
    }
    return couponCode;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("couponCode", couponCode);
    formData.append("discountType", discountType);
    formData.append("title", title);
    formData.append("description", content);
    formData.append("photo", thumbnail);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    if (discountType === "totalAmount") {
      formData.append("onShopping", onShopping);
      formData.append("discountPer", discountPer);
      formData.append("discount", discount);
    } else {
      formData.append("productIds", productIds);
      formData.append("discountPer", discountPer);
      formData.append("discount", discount);
    }
    try {
      const response = await GetCouponDetails.couponDiscCreate(formData);
      if (response && response.data) {
        NotificationManager.success(response.data.message);
      }
    } catch (error) {
      console.error("Error creating coupon:", error.response.data.error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="aiz-main-content mt-4">
        <div className="px-15px px-lg-25px">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0 h6">Coupon-Discount Information</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group" id="discount_table">
                      <div className="form-group row">
                        <label className="col-sm-3 control-label">Coupon Code</label>
                        <div className="col-sm-6">
                          <input
                            type="text"
                            className="form-control"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-3">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleGenerateCouponCode}
                          >
                            Generate
                          </button>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="form-group row">
                      <label className="col-sm-3 control-label" htmlFor="name">
                        Title
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          placeholder="Title"
                          id="name"
                          name="title"
                          className="form-control"
                          required
                          value={title}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label" htmlFor="signinSrEmail">
                        Banner <small>(1920x500)</small>
                      </label>
                      <div className="col-md-9">
                        <div className="file-preview box sm"></div>
                        <input
                          className="form-control"
                          type="file"
                          name="thumbnail"
                          onChange={onFileChange}
                        />
                        <span className="small text-muted">
                          This image is shown as cover banner in flash deal details page.
                        </span>
                      </div>
                    </div>
                    <div className="row" style={{ paddingTop: "2rem" }}>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label className="form-label">Description*</label>
                          <RichTextEditor
                            content={content}
                            handleContentChange={handleContentChange}
                            placeholder="insert text here..."
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="form-group row">
                      <label className="col-sm-3 control-label" htmlFor="start_date">
                        StartDate
                      </label>
                      <div className="col-sm-9">
                        <DatePicker
                          className="form-control w-100"
                          name="startDate"
                          selected={startDate}
                          onChange={handleStartDateChange}
                          showTimeSelect
                          dateFormat="Pp"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 control-label" htmlFor="start_date">
                        EndDate
                      </label>
                      <div className="col-sm-9">
                        <DatePicker
                          className="form-control w-100"
                          name="endDate"
                          selected={endDate}
                          onChange={handleEndDateChange}
                          showTimeSelect
                          dateFormat="Pp"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 control-label" htmlFor="discountType">
                        Discount Type
                      </label>
                      <div className="col-sm-9">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="discountType"
                            id="totalAmount"
                            value="totalAmount"
                            checked={discountType === "totalAmount"}
                            onChange={handleDiscountTypeChange}
                          />
                          <label className="form-check-label" htmlFor="totalAmount">
                            Total Amount
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="discountType"
                            id="particularProduct"
                            value="particularProduct"
                            checked={discountType === "particularProduct"}
                            onChange={handleDiscountTypeChange}
                          />
                          <label className="form-check-label" htmlFor="particularProduct">
                            Particular Product
                          </label>
                        </div>
                      </div>
                    </div>
                    {discountType === "particularProduct" && (
                      <div>
                        <div className="form-group row">
                          <label className="col-sm-3 control-label" htmlFor="start_date">
                            Products
                          </label>
                          <div className="col-sm-9">
                            <Multiselect
                              options={dropDownOpt}
                              onSelect={onSelect}
                              onRemove={onRemove}
                              displayValue="name"
                              showCheckbox={true}
                            />
                          </div>
                        </div>
                        <br />
                      </div>
                    )}
                    {discountType === "totalAmount" && (
                      <div className="form-group row">
                        <label className="col-sm-3 control-label" htmlFor="onShopping">
                          On Shopping
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            placeholder="On Shopping"
                            id="onShopping"
                            name="onShopping"
                            className="form-control"
                            required
                            value={onShopping}
                            onChange={(e) => setOnShopping(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    <br />

                    <div className="form-group row">
                      <label className="col-sm-3 control-label" htmlFor="discount">
                        Discount*
                      </label>
                      <div className="col-sm-9">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="discountOption"
                            id="discount"
                            value="discount"
                            checked={discountOption === "discount"}
                            onChange={handleDiscountOptionChange}
                          />
                          <label className="form-check-label" htmlFor="discountPer">
                            Discount
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="discountOption"
                            id="discountPer"
                            value="discountPer"
                            checked={discountOption === "discountPer"}
                            onChange={handleDiscountOptionChange}
                          />
                          <label className="form-check-label" htmlFor="discountPer">
                            Discount Percentage
                          </label>
                        </div>
                      </div>
                    </div>

                    {discountOption === "discount" && (
                      <div className="form-group" style={{ flex: "1" }}>
                        <input
                          type="number"
                          placeholder="Discount"
                          id="discount"
                          name="discount"
                          className="form-control"
                          value={discount}
                          onChange={handleDiscountChange}
                        />
                      </div>
                    )}

                    {discountOption === "discountPer" && (
                      <div className="form-group" style={{ flex: "1" }}>
                        <input
                          type="number"
                          placeholder="Discount Percentage"
                          id="discountPer"
                          name="discountPer"
                          className="form-control"
                          value={discountPer}
                          onChange={(e) => setDiscountPer(e.target.value)}
                        />
                      </div>
                    )}
                    {/* <div className="form-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}></div> */}

                    <div className="form-group row">
                      <div className="col-lg-9 ml-auto">
                        <button type="submit" className="btn btn-primary">
                          Create
                        </button>
                        <button
                          type="button"
                          className="btn btn-light ml-2"
                          onClick={handleBack}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
