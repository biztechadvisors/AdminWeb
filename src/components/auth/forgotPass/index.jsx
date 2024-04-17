import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { GetUserLogin } from "../../services";
import { NotificationManager } from "react-notifications";

export default class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPass: "",
      redirectToReferrer: false,
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    // var bytes = CryptoJS.AES.decrypt(email, 'TEDbuddyIndsFia');
    // var decryptEmail = bytes.toString(CryptoJS.enc.Utf8);
    this.setState({ email: email });
  }

  handleChangeUser(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPass } =
      this.state;
    if (confirmPass !== password) {
      return NotificationManager.error("Confirm Password is wrong");
    }
    let data = {
      email,
      password,
      role: "admin",
      verify: 1,
    };
    let user = await GetUserLogin.getUserUpdate(data);
    if (user) {
      this.setState({ redirectToReferrer: true });
      window.location.Redirect('/auth/login');
    }
  };

  render() {
    if (this.state.redirectToReferrer || localStorage.getItem("token")) {
      return <Redirect to={"/auth/login"} />;
    }

    return (
      <div className="bg-sign">
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header card-sign-header">
                        <h3 className="text-center font-weight-light my-4">
                          Forgot Password
                        </h3>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="form-group">
                            <label
                              className="form-label"
                              htmlFor="inputEmailAddress"
                            >
                              Email*
                            </label>
                            <input
                              className="form-control py-3"
                              id="inputEmailAddress"
                              type="email"
                              placeholder="Enter email address"
                              name="email"
                              value={this.state.email}
                              onChange={(e) => this.handleChangeUser(e)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Password*</label>
                            <input
                              className="form-control py-3"
                              type="password"
                              placeholder="Enter password"
                              name="password"
                              value={this.state.password}
                              onChange={(e) => this.handleChangeUser(e)}
                            />
                          </div>
                          <input
                            className="form-control py-3"
                            type="password"
                            placeholder="Confirm password"
                            name="confirmPass"
                            value={this.state.confirmPass}
                            onChange={(e) => this.handleChangeUser(e)}
                          />

                          <div
                            className="form-group d-flex align-items-center justify-content-between mt-4 mb-0"
                            onClick={this.handleSubmit}
                          >
                            <a className="btn btn-sign hover-btn">Submit</a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
