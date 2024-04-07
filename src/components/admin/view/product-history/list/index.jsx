import React, { Component } from "react";
import { Button, Typography, Paper, Grid } from "@material-ui/core";
import { GetProductDetails } from "../../../../services";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import Loader from "../../../../loader";
import CommonName from "./common-name";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: [],
      selectedProduct: "",
      isLoaded: false,
      productList: [],
      catList: [],
      categoryId: "",
      status: "",
      files: "",
      limit: 20,
      pageNumber: 1,
      searchValue: "",
      thumbnail: null,
    };
  }

  handleChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });

    if (value) {
      const data = {
        limit: this.state.limit,
        page: this.state.pageNumber,
        searchString: value,
      };
      this.getProductList(data);
    } else {
      const data = {
        limit: this.state.limit,
        page: this.state.pageNumber,
      };
      this.getProductList(data);
    }
  };

  onFileChange = (event) => {
    this.setState({ thumbnail: event.target.files[0] });
  };

  handleUpload = async (d) => {
    this.setState({ isLoaded: true });
    const formData = new FormData();
    formData.append("productId", d.id);
    formData.append("thumbnail", this.state.thumbnail);
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
        const list = await GetProductDetails.uploadMainProdImage(
          formData,
          config
        );
        if (list) {
          this.setState({ isLoaded: false });
          this.getProductList();
          window.location.reload();
        } else {
          this.setState({ isLoaded: false });
        }
      }
    });
  };

  handlDeleteById = (d) => {
    const data = {
      id: d.id,
      thumbnail: d.photo,
    };
    swal({
      title: "Are you sure?",
      text: "You want to delete thumnail",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.deleteMainProdImage(data);
        if (value) {
          NotificationManager.success(value.message, "Message");
          this.getProductList();
          window.location.reload();
        }
      }
    });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  async getProductList(data) {
    this.setState({ isLoaded: true });
    let list = await GetProductDetails.getAllSellerProduct(data);
    console.log("List", list);
  
    if (list) {
      this.setState({
        productList: list.data.items || [], // Ensure productList is an array even if items is undefined
        pages: list.data.pages || 0, // Default to 0 if pages is undefined
        pageNumber: Number(list.data.page || 1), // Default to page 1 if page is undefined
        isLoaded: false,
      });
    } else {
      this.setState({ isLoaded: false });
      console.log("Error fetching product data");
    }
  }

  async componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let data = {
      limit: this.state.limit,
      page: params.page || this.state.pageNumber,
    };
    if (Object.keys(params).length !== 0) {
      await this.getProductList(data);
    } else {
      await this.getProductList({
        limit: this.state.limit,
        page: this.state.pageNumber,
      });
    }
  }

  handlProductVarient = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.getProductVarient(id);
        if (value) {
          this.getProductList();
        }
        window.location.reload();
      }
    });
  };

  UpdateStatus = async (e, value) => {
    const data = { PubilshStatus: e.target.value, productId: value };
    let list = await GetProductDetails.getStatusUpdated(data);
    if (list) {
      NotificationManager.success(list.message);
      this.getProductList();
    }
  };

  handlePageClick = (selectedPage) => {
    // Extract the page number from the 'selectedPage' object
    const pageNumber = selectedPage.selected + 1;

    let data = { limit: this.state.limit, page: pageNumber };
    this.props.history.push({
      pathname: location.pathname,
      search: "?" + new URLSearchParams({ page: data.page }).toString(),
    });
    this.getProductList(data);
  };

  render() {
    const { productList, pages, pageNumber, isLoaded } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Products</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={this.handleBack}>
              <i className="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="index.html">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">Products</li>
        </ol>
        <div className="row justify-content-between">
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="col-lg-12">
                {isLoaded ? <Loader /> : ""}
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search product ..."
                      value={this.state.searchValue}
                      name="searchValue"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-lg-5 col-md-5 mt-3 text-right">
                    <Button variant="contained" onClick={() => window.location.reload()}>
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>
              <br />
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th className="text-center">Category</th>
                        <th>Thumbnail</th>
                        <th>Common Name</th>
                        <th>Product</th>
                        <th>PubilshStatus</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList && productList.length ? (
                        productList.map((d, i) => (
                          <React.Fragment key={i}>
                            <tr>
                              <td>{d.id}</td>
                              <td>
                                {d.maincat && d.SubCategory
                                  ? `${d.maincat.name} > ${d.SubCategory.sub_name}`
                                  : ""}
                              </td>
                              <td>
                                {d.photo ? (
                                  <div>
                                    <img src={d.photo} alt="thumnai" height="50" />
                                    <button
                                      className="save-btn hover-btn"
                                      type="submit"
                                      onClick={(e) => this.handlDeleteById(d)}
                                    >
                                      <i className="fas fa-trash-alt" />
                                    </button>
                                  </div>
                                ) : (
                                  <Grid>
                                    <input
                                      type="file"
                                      className="form-control"
                                      name="thumbnail"
                                      onChange={this.onFileChange}
                                    />
                                    <small>
                                      <b className="text-danger">*</b>Upload Thumnail
                                    </small>
                                    <br />
                                    <Button
                                      variant="contained"
                                      onClick={(e) => this.handleUpload(d)}
                                      disabled={!this.state.thumbnail}
                                    >
                                      Upload
                                    </Button>
                                  </Grid>
                                )}
                              </td>
                              <td>
                                {d.name}
                                <CommonName state={d} />
                              </td>
                              <td>
                                <Paper>
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th>Thumbnail</th>
                                        <th>Product</th>
                                        <th>MRP Price</th>
                                        <th>Selling Price</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {d.ProductVariants.map((row, index) => (
                                        <tr key={index}>
                                          <td>
                                            {row.thumbnail ? (
                                              <img
                                                src={row.thumbnail}
                                                alt="thumbnail"
                                                height="40"
                                              />
                                            ) : (
                                              <span className="text-danger">
                                                Please upload image
                                              </span>
                                            )}
                                          </td>
                                          <td>{row.slug}</td>
                                          <td>{row.actualPrice}</td>
                                          <td>{row.netPrice}</td>
                                          <td>
                                            <div className="action-btns">
                                              <Typography
                                                className="delete-btn"
                                                onClick={() => this.handlProductVarient(row.id)}
                                              >
                                                <i className="fas fa-trash-alt" />
                                              </Typography>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </Paper>
                              </td>
                              <td style={{ width: "220px" }}>
                                <select
                                  className="form-control"
                                  defaultValue={d.PubilshStatus}
                                  onChange={(e) => this.UpdateStatus(e, d.id)}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Unpublished">Unpublished</option>
                                  <option value="Published">Published</option>
                                </select>
                              </td>
                              <td>
                                <div className="action-btns">
                                  <Link
                                    to={{
                                      pathname: `/admin/seller/product-detail/edit/${d.id}`,
                                      state: d,
                                    }}
                                  >
                                    <Typography className="edit-btn">
                                      <i className="fas fa-edit" />
                                    </Typography>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">Loading...</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <ReactPaginate
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                  breakLabel={"..."}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  pageCount={pages || 0}
                  forcePage={pageNumber - 1}
                  onPageChange={this.handlePageClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
