import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { NotificationManager } from "react-notifications";
import { GetProductDetails } from "../../../../services";
export default class Edit extends Component {
  constructor(props) {
    super(props);
    const { name, title, keyword, desc } = this.props.state;
    this.state = {
      name: name,
      title: title,
      keyword: keyword,
      desc: desc,
      thumbnail: null,
    };
  }
  onFileChange = (event) => {
    this.setState({ thumbnail: event.target.files[0] });
  };
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
  handleOpen() {
    this.setState({ open: !this.state.open, loading: true });
  }

  handleClose() {
    this.setState({ open: !this.state.open });
  }
  handleChangeLocation = (value) => {
    this.setState({ selectLocation: value });
  };

  async handleSubmit(e) {
    let slug = this.convertToSlug(this.state.name);
    let { name, title, keyword, desc, thumbnail } = this.state;
    const formData = new FormData();
    formData.append("id", this.props.state.id);
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("title", title);
    formData.append("keyword", keyword);
    formData.append("desc", desc);
    formData.append("thumbnail", thumbnail);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    let list = await GetProductDetails.updatebrandList(formData, config);
    if (list) {
      window.location.reload();
    }
  }
  render() {
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
                  Update Brand
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
              <div className="modal-body">
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
                  <label className="form-label">Category Image*</label>
                  <input
                    type="file"
                    className="form-control"
                    name="thumbnail"
                    onChange={this.onFileChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Meta Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={this.state.title}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Meta Keyword*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="keyword"
                    value={this.state.keyword}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Meta Desc*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="desc"
                    value={this.state.desc}
                    onChange={(e) => this.handleChange(e)}
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
