import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { GetSupplierDetails, GetProductDetails } from "../../../../services";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loader from "../../../../loader";
import { ExportToExcel } from "../../../../common/ExportToExcel";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      getAllProduct: [],
      searchValue: "",
      limit: 20,
      pageNumber: 1,
      pages: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  UpdateStatus = async (e, value) => {
    const data = { PubilshStatus: e.target.value, productId: value };
    let list = await GetProductDetails.getStatusUpdated(data);
    if (list) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      let requestData = {
        page: params.page || this.state.pageNumber,
        limit: this.state.limit,
      };
      this.getProductList(requestData);
    }
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  getProductList = async (data) => {
    this.setState({ isLoaded: true });
    let list = await GetProductDetails.getAllSellerProduct(data);
    console.log("first", list)
    if (list.code === 200) {
      this.setState({
        getAllProduct: list.data.items,
        isLoaded: false,
        pageNumber: list.data.page,
        pages: list.data.pages,
      });
    } else {
      this.setState({ isLoaded: false });
    }
  };

  SearchAllProductList = (event) => {
    event.preventDefault();
    const data = {
      limit: this.state.limit,
      page: this.state.pageNumber,
      searchString: this.state.searchValue,
    };
    console.log("SearchData", data)
    this.getProductList(data);
  };

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let requestData = { page: params ? params.page : "", limit: this.state.limit };
    if (Object.keys(params).length !== 0) {
      this.getProductList(requestData);
    } else {
      this.getProductList({
        limit: this.state.limit,
        page: this.state.pageNumber,
      });
    }
  }

  handlePageClick = (selectedPage) => {
    console.log("SelectedPage", selectedPage);

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
    const { pages, pageNumber, isLoaded, getAllProduct } = this.state;
    const fileName = "productlist";
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Seller All Products</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" color="primary" onClick={this.handleBack}>
              <i className="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-lg-12 col-md-12 m-1">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="col-lg-12">
                {isLoaded && <Loader />}
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search product..."
                      value={this.state.searchValue}
                      name="searchValue"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-lg-1 col-md-1">
                    <button
                      className="save-btn hover-btn"
                      type="submit"
                      onClick={this.SearchAllProductList}
                    >
                      Search
                    </button>
                  </div>
                  <div className="col-lg-3 col-md-3 mt-3 text-right">
                    <Button variant="contained" color="secondary" onClick={() => window.location.reload()}>
                      Refresh
                    </Button>
                  </div>
                  <div className="col-lg-2 col-md-2 mt-3 text-right">
                    <ExportToExcel apiData={getAllProduct} fileName={fileName} />
                  </div>
                </div>
              </div>
              <br />
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: 60 }}>ID</th>
                        <th style={{ width: 100 }}>Thumbnail</th>
                        <th style={{ width: 200 }}>Name</th>
                        <th>Category</th>
                        <th>SubCategory</th>
                        <th>Collection</th>
                        <th>DiscountPer</th>
                        <th>DiscountPrice</th>
                        <th>NetPrice</th>
                        <th>ActualPrice</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllProduct && getAllProduct.length ? (
                        getAllProduct.map((row) => {
                          if (row.slug !== null) {
                            return (
                              <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>
                                  <img src={row.photo} height="40px" alt="Thumbnail" />
                                </td>
                                <td>{row.name}</td>
                                <td>{row.maincat.name}</td>
                                <td>{row.SubCategory.sub_name}</td>
                                <td>{row.collection.name}</td>
                                <td>{row.ProductVariants[0].discountPer ? row.ProductVariants[0].discountPer + "%" : ""}</td>
                                <td>Rs.{row.ProductVariants[0].discount}</td>
                                <td>Rs.{row.ProductVariants[0].netPrice}</td>
                                <td>Rs.{row.ProductVariants[0].actualPrice}</td>
                                <td style={{ width: "200px" }}>
                                  <select
                                    className="form-control"
                                    value={row.PubilshStatus}
                                    onChange={(e) => this.UpdateStatus(e, row.id)}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Unpublished">Unpublished</option>
                                    <option value="Published">Published</option>
                                  </select>
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })
                      ) : (
                        <tr>
                          <td colSpan="12">No data found</td>
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
