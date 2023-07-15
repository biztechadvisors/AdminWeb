import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetProductDetails } from "../../../../services";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    const { TITLE } = this.props.state;
    this.state = {
      name: TITLE,
      image: null,
    };
  }
  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleOpen() {
    this.setState({ open: !this.state.open, loading: true });
  }

  handleClose() {
    this.setState({ open: !this.state.open });
  }
  async handleSubmit(e) {
    let { name, image } = this.state;
    const formData = new FormData();
    formData.append("id", this.props.state.id);
    formData.append("name", name);
    formData.append("thumbnail", image);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    let list = await GetProductDetails.updateColorList(formData, config);
    if (list) {
      window.location.reload();
    }
  }
  render() {
    console.log("--->", this.props.state);
    return (
      <div>
        <a className="edit-btn" onClick={(e) => this.handleOpen()}>
          <i className="fas fa-edit" />
        </a>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Color
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.handleClose()}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div
                className="modal-body"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <div className="form-group">
                  <label className="form-label">Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Image (70*70)</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={this.onFileChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.handleClose()}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.handleSubmit()}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
