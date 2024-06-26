import React, { Component } from "react";
import { GetUserLogin, GetOrderDetails } from "../../services";
import "../sidebar/sidebar.css"

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: "",
    };
  }

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

    let { list } = this.state;
    const { headerCallback } = this.props;
    console.log("first",headerCallback)
    return (
      <div>
        <nav className="sb-topnav navbar navbar-expand navbar-light bg-clr">
          <a className="navbar-brand logo-brand" href="/">
            Codenox
          </a>
          <button
            className="btn btn-link btn-sm order-1 order-lg-0"
            id="sidebarToggle"
            onClick={headerCallback} // Assuming this prop is passed from parent
          >
            <i className="fas fa-bars" />
          </button>
          <a href="/" className="frnt-link">
            <i className="fas fa-external-link-alt" />
            Home
          </a>
          <ul className="navbar-nav ml-auto mr-md-0">
            <div className="my-2">
              <li className="nav-item dropdown">
                <i
                  className="fa fa-bell"
                  aria-hidden="true"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <sup className="sup_num">{list ? list.count : ""}</sup>
                </i>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="userDropdown"
                  style={{ width: "20rem", padding: "5px" }}
                >
                  {/* {
                                        list ?
                                            list.data.map((row, index) => (
                                                <h6 key={index} style={index%2?{color: "#ffa64d"}:{color:'#ff8000'}}>{index+1}.{row.details? row.details.product_detail.name:''}</h6>
                                            ))
                                            : ''
                                    } */}
                </div>
              </li>
            </div>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
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
                <a className="dropdown-item admin-dropdown-item" href="">
                  Edit Profile
                </a>
                <a className="dropdown-item admin-dropdown-item" href="">
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
        </nav>
      </div>
    );
  }
}