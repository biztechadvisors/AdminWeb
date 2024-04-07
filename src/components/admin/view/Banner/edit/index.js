import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import swal from "sweetalert";
import { NotificationManager } from "react-notifications";
import RichTextEditor from "../../../../RichTextEditor";
import { GetProductDetails } from "../../../../services";

const Edit = (props) => {

    console.log("Props", props)
    const [open, setOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [heading, setHeading] = useState(props.state.heading || "");
    const [banner, setBanner] = useState(props.state.banner || "");
    const [content, setContent] = useState(props.state.content || "");

    const onFileChange = (event) => {
        setBanner(event.target.files[0]);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleHeadingChange = (e) => {
        setHeading(e.target.value);
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


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("id", props.state.id);
        formData.append("content", content);
        formData.append("banner", banner);
        formData.append("heading", heading);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        swal({
            title: "Are you sure?",
            text: "You want to update the Banner-Deatils",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
            if (success) {
                setIsLoaded(true); // Show loader while processing
                console.log("Data", JSON.stringify(Object.fromEntries(formData)));

                try {
                    // Send the form data to update the coupon/discount details
                    let list = await GetProductDetails.getBannerUploadList(
                        formData,
                        config
                    );
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
                                    <h5 className="mb-0 h6">Banner Information</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>


                                        <div className="form-group row">
                                            <label className="col-sm-3 control-label" htmlFor="name">
                                                Heading*
                                            </label>
                                            <div className="col-sm-9">
                                                <textarea
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="ex: Heading..."
                                                    name="heading"
                                                    value={heading}
                                                    onChange={handleHeadingChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 control-label" htmlFor="name">
                                                Content*
                                            </label>
                                            <div className="col-sm-9">
                                                <textarea
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="ex: Content..."
                                                    name="content"
                                                    value={content}
                                                    onChange={handleContentChange}
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
                                                    name="banner"
                                                    onChange={onFileChange}
                                                />
                                                <span className="small text-muted">
                                                    This image is shown as cover Banner.
                                                </span>
                                            </div>
                                        </div>
                                        {/* <div className="row" style={{ paddingTop: "2rem" }}>
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
                                        </div> */}

                                        <br />
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
