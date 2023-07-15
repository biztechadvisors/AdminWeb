import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { GetProductDetails } from "../../../../services";
import swal from "sweetalert";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      image: null,
    };
  }
  handleBack() {
    this.props.history.goBack();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { color, image } = this.state;
    const formData = new FormData();
    formData.append("name", color);
    formData.append("thumbnail", image);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    swal({
      title: "Are you sure?",
      text: "You want to Add New color",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetProductDetails.createColorList(formData, config);
        if (list) {
          this.setState({ getList: list.data });
          window.location.href = "/admin/color/list";
        }
      }
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Create Color</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="index.html">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">Add Colour</li>
        </ol>
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>Add New Color</h4>
              </div>
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <div className="form-group">
                    <label className="form-label">Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ex: green"
                      name="color"
                      value={this.state.color}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Thumbnail(70*70)</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={this.onFileChange}
                    />
                  </div>
                  <button
                    className="save-btn hover-btn"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Add New
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
