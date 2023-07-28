import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { GetProductDetails, GetCouponDetails } from "../../../../services";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import swal from "sweetalert";
import { NotificationManager } from "react-notifications";
import Loader from "../../../../loader";

const Edit = (props) => {
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState(props.state.title);
  const [startDate, setStartDate] = useState(new Date(props.state.startDate));
  const [photo, setPhoto] = useState(props.state.photo);
  const [endDate, setEndDate] = useState(new Date(props.state.endDate));
  const [productIds, setProductIds] = useState([]);
  const [dropDownOpt, setDropDownOpt] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const onSelect = (selectedList, selectedItem) => {
    const value = selectedList.map((option) => option.id);
    setProductIds(value);
  };

  const onRemove = (selectedList, removedItem) => {
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

  useEffect(() => {
    renderData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", props.state.id);
    formData.append("title", title);
    formData.append("photo", photo);
    formData.append("description", props.state.description);
    formData.append("couponCode", props.state.couponCode);
    formData.append("discount", props.state.discount);
    formData.append("discountType", props.state.discountType);
    formData.append("startDate", new Date(startDate));
    formData.append("endDate", new Date(endDate));
    if (props.state.discountType === "totalAmount") {
      formData.append('onShopping', props.state.onShopping);
    } else {
      formData.append('discountPer', props.state.discountPer);
      formData.append('productIds', productIds);
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
        let list = await GetCouponDetails.couponDiscUpdate(formData, config);
        if (list) {
          NotificationManager.success(list.message);
          setIsLoaded(false);
          window.location.reload();
        } else {
          setIsLoaded(false);
        }
      }
    });
  };

  return (
    <div>
      <a className="edit-btn" onClick={handleOpen}>
        <i className="fas fa-edit" />
      </a>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className="modal-dialog" role="document">
          {isLoaded ? <Loader /> : null}

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Flash Sale
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
                <label
                  className="col-md-3 col-form-label"
                  htmlFor="signinSrEmail"
                >
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
                    This image is shown as cover banner in flash deal details
                    page.
                  </span>
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-sm-3 control-label"
                  htmlFor="start_date"
                >
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
                <label
                  className="col-sm-3 control-label"
                  htmlFor="start_date"
                >
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
                <label
                  className="col-sm-3 control-label"
                  htmlFor="start_date"
                >
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
      </Modal>
    </div>
  );
};

export default Edit;
