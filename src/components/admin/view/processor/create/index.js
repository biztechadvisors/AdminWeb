import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { GetProductDetails } from "../../../../services";
import swal from "sweetalert";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "laptop",
    };
  }
  handleBack() {
    this.props.history.goBack();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  convertToSlug(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, type } = this.state;
    let data = { name: name, type: type };
    swal({
      title: "Are you sure?",
      text: "You want to Add New name",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetProductDetails.createProcessor(data);
        if (list) {
          this.setState({ getList: list.data });
          window.location.href = "/admin/processor/list";
        }
      }
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Create name</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">Create Processor</li>
        </ol>
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>Add New name</h4>
              </div>
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <div className="form-group">
                    <label className="form-label">Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ex: core i7"
                      name="name"
                      value={this.state.name}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <select
                    className="form-control"
                    name="type"
                    value={this.state.type}
                    onChange={(e) => this.handleChange(e)}
                  >
                    <option disabled selected>
                      Select type
                    </option>
                    <option value={"laptop"}>Laptop</option>
                    <option value={"desktop"}>Desktop</option>
                    <option value={"tablet"}>Tablet</option>
                  </select>
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
