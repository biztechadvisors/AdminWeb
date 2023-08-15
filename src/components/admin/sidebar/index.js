import React, { Component } from "react";
import { getCookie } from "../../../function";
import "./sidebar.css"; // Import your CSS file for styling
import { GetUserLogin, GetOrderDetails } from "../../services";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      list: "",
    };
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  async getOrderNotifications() {
    this.setState({ isloaded: true });
    let list = await GetOrderDetails.getOrderNotification();
    if (list) {
      this.setState({ list: list });
    }
  }

  componentDidMount() {
    this.getOrderNotifications();
  }

  render() {
    const { isOpen, list } = this.state;
    const role = getCookie("role");

    return (
      <div className={`container-fluid mt-3`}>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
          <div className="container-fluid p-2">
            <a className="navbar-brand text-primary mr-0" href="#">
              Codenox
            </a>

            <ul className="navbar-nav ml-auto mr-md-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="notificationDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-bell" aria-hidden="true">
                    {list && list.count > 0 && (
                      <sup className="sup_num">{list.count}</sup>
                    )}
                  </i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="notificationDropdown"
                  style={{ width: "20rem", padding: "5px" }}
                >
                  {list &&
                    list.data.map((row, index) => (
                      <h6
                        key={index}
                        style={{
                          color: index % 2 ? "#ffa64d" : "#ff8000",
                        }}
                      >
                        {index + 1}.{row.details && row.details.product_detail.name}
                      </h6>
                    ))}
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user fa-fw" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="userDropdown"
                >
                  <a className="dropdown-item admin-dropdown-item" href="#">
                    Edit Profile
                  </a>
                  <a className="dropdown-item admin-dropdown-item" href="#">
                    Change Password
                  </a>
                  <span
                    className="dropdown-item admin-dropdown-item"
                    onClick={() => GetUserLogin.logout()}
                  >
                    Logout
                  </span>
                </div>
              </li>
            </ul>

            <div className="form-inline ml-auto">
              <button
                className="btn btn-primary btn-toggle"
                onClick={this.toggleSidebar}
              >
                <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`} />
              </button>
            </div>
          </div>
        </nav>
        <div className={`sidebar ${isOpen ? "active" : ""}`}>
          <div className="sd-header">
            <h4 style={{ color: "white" }}>Admin-Dashboard</h4>
            <div className="btn btn-primary" onClick={this.toggleSidebar}>
              <i className="fa fa-times"></i>
            </div>
          </div>
          <div className="sd-body">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <a
                    className="nav-link active"
                    href="/"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-tachometer-alt" />
                    </div>
                    Dashboard
                  </a>
                  <a
                    className="nav-link collapsed"
                    href="#collapseShops"
                    data-toggle="collapse"
                    data-target="#collapseShops"
                    aria-expanded="false"
                    aria-controls="collapseShops"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-user" />
                    </div>
                    All Products
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down" />
                    </div>
                  </a>
                  <div className="collapse" id="collapseShops">
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link sub_nav_link" href="/admin/product/create">
                        Add New Product
                      </a>
                    </nav>
                  </div>
                  <div
                    className="collapse"
                    id="collapseShops"
                    aria-labelledby="headingTwo"
                    data-parent="#sidenavAccordion"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <a
                        className="nav-link sub_nav_link"
                        href="/admin/shop/seller/all-product"
                      >
                        All product
                      </a>
                    </nav>
                  </div>
                  <div
                    className="collapse"
                    id="collapseShops"
                    aria-labelledby="headingTwo"
                    data-parent="#sidenavAccordion"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <a
                        className="nav-link sub_nav_link"
                        href="/admin/seller/product-detail/list/history"
                      >
                        Product Detail
                      </a>
                    </nav>
                  </div>
                  <a
                    className="nav-link collapsed"
                    href="#collapseProducts"
                    data-toggle="collapse"
                    data-target="#collapseProducts"
                    aria-expanded="false"
                    aria-controls="collapseProducts"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-box" />
                    </div>
                    Products Attributes
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down" />
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="collapseProducts"
                    aria-labelledby="headingTwo"
                    data-parent="#sidenavAccordion"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link sub_nav_link" href="/admin/color/list">
                        Color
                      </a>
                    </nav>
                  </div>
                  <a
                    className="nav-link collapsed"
                    href="#collapseCategories"
                    data-toggle="collapse"
                    data-target="#collapseCategories"
                    aria-expanded="false"
                    aria-controls="collapseCategories"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-list" />
                    </div>
                    Categories
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down" />
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="collapseCategories"
                    aria-labelledby="headingTwo"
                    data-parent="#sidenavAccordion"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <a
                        className="nav-link sub_nav_link"
                        href="/admin/category/list"
                      >
                        All Categories
                      </a>
                      <a
                        className="nav-link sub_nav_link"
                        href="/admin/category/create"
                      >
                        Add Category
                      </a>
                      <a
                        className="nav-link sub_nav_link"
                        href="/admin/category/sub-create"
                      >
                        Add Sub-Category
                      </a>
                    </nav>
                  </div>
                  <a className="nav-link" href="/admin/order/list">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-cart-arrow-down" />
                    </div>
                    Orders
                  </a>
                  <a className="nav-link" href="/admin/customization/list">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-cart-arrow-down" />
                    </div>
                    Customization List
                  </a>
                  <a className="nav-link" href="/admin/processor/list">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-cart-arrow-down" />
                    </div>
                    DileveryCharges-Changer
                  </a>
                  <a className="nav-link" href="/admin/image/upload">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-image"></i>
                    </div>
                    Banner Upload
                  </a>
                  <a className="nav-link" href="/admin/collection/list">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-store" />
                    </div>
                    Collections
                  </a>
                  <a
                    className="nav-link collapsed"
                    href="#collapseMarketing"
                    data-toggle="collapse"
                    data-target="#collapseMarketing"
                    aria-expanded="false"
                    aria-controls="collapseMarketing"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fa fa-bullhorn" aria-hidden="true" />
                    </div>
                    Marketing
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down" />
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="collapseMarketing"
                    aria-labelledby="headingTwo"
                    data-parent="#sidenavAccordion"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <ul className="aiz-side-nav-list level-2 mm-collapse mm-show">
                        <li className="aiz-side-nav-item">
                          <a
                            className="nav-link sub_nav_link"
                            href="/admin/marketing/list"
                          >
                            Flash Sale
                          </a>
                        </li>
                        <li className="aiz-side-nav-item">
                          <a
                            className="nav-link sub_nav_link"
                            href="/admin/couponDiscount/list"
                          >
                            Coupon-Code Management
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <a className="nav-link" href="/admin/seo/list">
                    <div className="sb-nav-link-icon">
                      <i className="fab fa-yoast"></i>
                    </div>
                    SEO
                  </a>
                  <a
                    className={role === "admin" ? "nav-link" : "d-none"}
                    href="/admin/user/list"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-users" />
                    </div>
                    Roles Management
                  </a>
                  <a className="nav-link" href="/admin/customer/list">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-users" />
                    </div>
                    Customers
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div
          className={`sidebar-overlay ${isOpen ? "active" : ""}`}
          onClick={this.toggleSidebar}
        ></div>
      </div>
    );
  }
}
