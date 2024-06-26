import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetCategoryDetails } from "../../../../../../services";

export default class SubEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.state.sub_name || "",
      slug: props.state.slug || "",
      image: null,
      keyword: props.state.keyword || "",
      desc: props.state.desc || "",
      title: props.state.title || "",
      open: false, // Initialize the 'open' state
    };
  }

  componentDidUpdate(prevProps) {
    // Check if props have changed
    if (prevProps.state !== this.props.state) {
      const { sub_name, slug, title, keyword, desc } = this.props.state;
      this.setState({
        name: sub_name || "",
        slug: slug || "",
        keyword: keyword || "",
        desc: desc || "",
        title: title || "",
      });
    }
  }

  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOpen = () => {
    this.setState({ open: !this.state.open, loading: true });
  };

  handleClose = () => {
    this.setState({ open: !this.state.open });
  };

  handleSubmit = async () => {
    const { name, slug, image, keyword, desc, title } = this.state;

    const formData = new FormData();
    formData.append("id", this.props.state.id);
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("title", title);
    formData.append("keyword", keyword);
    formData.append("desc", desc);
    formData.append("thumbnail", image);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    let list = await GetCategoryDetails.getUpdateSubList(formData, config);
    if (list) {
      window.location.reload();
    }
  };

  render() {
    return (
      <div>
        <a className="edit-btn" onClick={this.handleOpen}>
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
                  Update Category
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
                  <label className="form-label">Slug*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="slug"
                    value={this.state.slug}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category Image*</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={this.onFileChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ex: Online Category"
                    name="title"
                    value={this.state.title}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group my-1">
                  <label className="form-label">
                    Keyword<b className="text-danger">*</b>
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="ex: Ninobyvani"
                    name="keyword"
                    value={this.state.keyword}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group my-1">
                  <label className="form-label">
                    Meta Descriptoin<b className="text-danger">*</b>
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="description...."
                    name="desc"
                    value={this.state.desc}
                    onChange={(e) => this.handleChange(e)}
                  />

                  {/* <RichTextEditor
                    content={this.state.content}
                    handleContentChange={this.handleContentChange}
                    placeholder="insert text here..."
                  /> */}
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
