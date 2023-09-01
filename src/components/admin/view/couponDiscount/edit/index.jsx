import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import swal from "sweetalert";
import { NotificationManager } from "react-notifications";
import Loader from "../../../../loader";
import { GetProductDetails, GetCouponDetails } from "../../../../services";
import RichTextEditor from "../../../../RichTextEditor";

const Edit = (props) => {
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState(props.state.title || "");
  const [startDate, setStartDate] = useState(new Date(props.state.startDate) || new Date());
  const [photo, setPhoto] = useState(props.state.photo);
  const [endDate, setEndDate] = useState(new Date(props.state.endDate) || new Date());
  const [productIds, setProductIds] = useState([]);
  const [dropDownOpt, setDropDownOpt] = useState([]);
  const [couponCode, setCouponCode] = useState(props.state.couponCode);
  const [discount, setDiscount] = useState(props.state.discount);
  const [content, setContent] = useState(props.state.description);
  const [discountType, setDiscountType] = useState(props.state.discountType);
  const [discountPer, setDiscountPer] = useState(props.state.discountPer);
  const [onShopping, setOnShopping] = useState(props.state.onShopping);
  const [discountOption, setDiscountOption] = useState(props.state.discount ? "discount" : "discountPer");

  console.log("Props", props)

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const onSelect = (selectedList) => {
    const value = selectedList.map((option) => option.id);
    setProductIds(value);
  };

  const onRemove = (selectedList) => {
    const value = selectedList.map((option) => option.id);
    setProductIds(value);
  };

  const onFileChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    }
    console.log(`Updated ${name}:`, value);
  };

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    props.history.goBack();
  };

  const renderData = async () => {
    const API = await GetProductDetails.getFlashSaleProduct();
    const serverResponse = API.data;
    setDropDownOpt(serverResponse);
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

  useEffect(() => {
    renderData();
  }, []);

  const handleGenerateCouponCode = () => {
    const generatedCode = generateCouponCode();
    setCouponCode(generatedCode);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", props.state.id);
    formData.append("couponCode", couponCode);
    formData.append("discountType", discountType);
    formData.append("title", title);
    formData.append("description", content);
    formData.append("photo", photo);
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

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    swal({
      title: "Are you sure?",
      text: "You want to update the product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        setIsLoaded(true); // Show loader while processing

        console.log("Data", JSON.stringify(Object.fromEntries(formData)));


        try {
          // Send the form data to update the coupon/discount details
          const list = await GetCouponDetails.couponDiscUpdate(formData, config);

          if (list) {
            NotificationManager.success(list.message);
            setIsLoaded(false);
            window.location.reload();
          } else {
            setIsLoaded(false);
          }
        } catch (error) {
          setIsLoaded(false);
          // Handle error if any
          console.error("Error while updating:", error);
          NotificationManager.error("Failed to update. Please try again later.");
        }
      }
    });
  };

  return (
    <div className="container">
      <a className="edit-btn" onClick={handleOpen}>
        <i className="fas fa-edit" />
      </a>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ maxHeight: "90vh", overflowY: "auto" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Discount
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="card-body">
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
                  </form>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Edit;
