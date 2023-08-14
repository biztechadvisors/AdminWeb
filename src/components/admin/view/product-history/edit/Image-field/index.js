import React, { Component } from "react";
import { Paper, Button } from "@material-ui/core";
import Loader from "../../../../../loader";
import { GetProductDetails } from "../../../../../services";
import swal from "sweetalert";
import NotificationManager from "react-notifications/lib/NotificationManager";

import "./ImageDetail.css"; // Import your CSS file for styling

export default class ImageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      files: [],
      isLoaded: false,
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onFileChange = (event) => {
    this.setState({ thumbnail: event.target.files[0] });
  };

  fileSelectedHandler = (event) => {
    this.setState({ files: event.target.files });
  };
  async componentDidMount() {
    try {
      const url = window.location.href.split("/");
      const lastSegment = url.pop() || url.pop();
      const data = { id: lastSegment };
      const response = await GetProductDetails.getImageDetailList(data);

      if (response.success) {
        const { productId, productName, photos } = response.data;
        const dataList = [
          {
            productId,
            productName,
            photos: Array.isArray(photos) ? photos : [],
          },
        ];

        this.setState({ dataList });
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleMultipeUpload = async (row) => {
    const formData = new FormData();
    formData.append("productId", row.productId);
    formData.append("varientId", row.varientId);
    for (const file of this.state.files) {
      formData.append("file", file);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    swal({
      title: "Are you sure?",
      text: "You want to add Images",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        this.setState({ isLoaded: true });
        try {
          const response = await GetProductDetails.getMultipleImageUpload(
            formData,
            config
          );
          if (response && response.success) {
            NotificationManager.success(response.message, "Message");
            window.location.reload()
          }
        } catch (error) {
          console.error(error);
          NotificationManager.error("An error occurred", "Error");
        } finally {
          this.setState({ isLoaded: false });
        }
      }
    });
  };

  handlMultipeDelete(row) {
    const data = { id: row.id, imgUrl: row.imgUrl };
    swal({
      title: "Are you sure?",
      text: "You want to delete thumnail from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.getMultipleImageDelete(data);
        if (value) {
          NotificationManager.success(value.message, "Message");
          window.location.reload()
        }
      }
    });
  }
  render() {
    const { dataList, isLoaded } = this.state;

    return (
      <Paper className="image-detail-paper">
        {isLoaded && <Loader />}
        <div className="card card-static-2">
          <div className="card-body-table">
            <div className="table-responsive">
              {dataList ? (
                dataList.map((row, index) => (
                  <div key={index} className="image-detail-row">
                    <div>{row.productId}</div>
                    {/* File input for image upload */}
                    <td>
                      <div className="image-upload-container">
                        <div className="upload-section">
                          <input
                            className="form-control"
                            type="file"
                            multiple
                            name="files"
                            onChange={this.fileSelectedHandler}
                          />
                          <small>
                            <b className="text-danger">*</b>
                            <br />
                            Add at least 4 images of your product & Size between 500x500
                          </small>
                          <Button
                            variant="contained"
                            className="upload-button"
                            onClick={() => this.handleMultipeUpload(row)}
                            disabled={!this.state.files}
                          >
                            Upload
                          </Button>
                        </div>
                        <div className="separator"></div>
                        {/* Display existing images */}
                        <div className="image-gallery">
                          {row.photos.map((data, index) => (
                            <div key={index} className="image-container">
                              <img
                                src={data.imgUrl}
                                alt="product-name"
                                className="product-image"
                              />
                              <span
                                className="delete-btn"
                                onClick={() => this.handlMultipeDelete(data)}
                              >
                                <i className="fas fa-trash-alt" />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </div>
                ))
              ) : (
                <p>No data found</p>
              )}
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}