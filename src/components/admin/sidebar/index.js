import React, { Component } from "react";
import { getCookie } from "../../../function";
import "./sidebar.css"; // Import your CSS file for styling
import { GetUserLogin } from "../../services";

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

  render() {
    const { isOpen } = this.state;
    const role = getCookie("role");

    return (
      <div className={`container-fluid mt-3`}>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
          <div className="container-fluid p-2">
            <a className="navbar-brand text-primary mr-0" href="/">
              Codenox
            </a>
            <a style={{ marginLeft: "30px" }}
              className="navbar-brand text-primary mr-0 dropdown-toggle"
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
              className="dropdown-menu"
              aria-labelledby="userDropdown"
            >
              <span
                className="dropdown-item admin-dropdown-item"
                onClick={() => GetUserLogin.logout()}
              >
                Logout
              </span>
            </div>
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
                    className="nav-link sub_nav_link"
                    href="/admin/couponDiscount/list"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-bullhorn"></i>
                    </div>
                    Flash Sale
                  </a>

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
