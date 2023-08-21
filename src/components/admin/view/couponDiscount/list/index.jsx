import React, { useState, useEffect } from "react";
import { Typography, Paper } from "@material-ui/core";
import Edit from "../edit";
import { GetCouponDetails } from "../../../../services";
import swal from "sweetalert";
import Moment from "react-moment";
import { NotificationManager } from "react-notifications";

const List = () => {
  const [getList, setGetList] = useState([]);

  useEffect(() => {
    getFlashSale();
  }, []);

  const handleBack = () => {
    // Do something when back button is clicked
    // e.g., navigate to the previous page
  };

  const getFlashSale = async () => {
    const list = await GetCouponDetails.getCouponDiscList();
    setGetList(list.data);
  };

  console.log("flashSale", getList)

  const CouponHandlDeleteById = async (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this Coupon from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        const value = await GetCouponDetails.deleteCouponDisc(id);
        if (value) {
          getFlashSale();
        }
      }
    });
  };

  const handlDeleteById = async (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete Location from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        const value = await GetCouponDetails.deleteProductFromCouponDisc(id);
        if (value) {
          getFlashSale();
        }
      }
    });
  };

  const handleStatus = async (index, value, getData) => {
    const status = getData.status ? 0 : 1;
    const data = { id: getData.id, status: status };
    const list = await GetCouponDetails.couponDiscStatus(data);
    if (list) {
      NotificationManager.success("Update status", "Status");
      window.location.reload();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center aiz-tilter mt-4">
        <div className="col-md-6">
          <h1 className="h3">All Coupon Codes</h1>
        </div>
        <div className="col-md-6 text-md-right">
          <a href="/admin/couponDiscount/create" className="btn btn-circle btn-info">
            <span>Create New Coupon Code</span>
          </a>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-lg-12 col-md-12">
          <div className="card card-static-2 mt-30 mb-30">
            <div className="card-title-2">
              <h4>Coupon Codes</h4>
            </div>
            <div className="card-body-table">
              <div className="table-responsive">
                <table className="table ucp-table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>Id</th>
                      <th>Title</th>
                      <th>Discount-Type</th>
                      <th>Coupon-Code</th>
                      <th>Discount</th>
                      <th>Banner</th>
                      <th>Start Date </th>
                      <th>End Date </th>
                      <th className="text-center">Product</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getList.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            className="check-item"
                            name="ids[]"
                            defaultValue={7}
                          />
                        </td>
                        <td>{row.title}</td>
                        <td>{row.discountType}</td>
                        <td>{row.couponCode}</td>
                        <td>{row.discount}</td>
                        <td>
                          <img
                            src={row.photo}
                            alt={row.title}
                            height="100px"
                          />
                        </td>
                        <td>
                          <span className="delivery-time">
                            <Moment format="MMMM Do YYYY">
                              {row.startDate}
                            </Moment>
                          </span>
                          <span className="delivery-time">
                            <Moment format=" h:mm:ss a">{row.startDate}</Moment>
                          </span>
                        </td>
                        <td>
                          <span className="delivery-time">
                            <Moment format="MMMM Do YYYY">{row.endDate}</Moment>
                          </span>
                          <span className="delivery-time">
                            <Moment format=" h:mm:ss a">{row.endDate}</Moment>
                          </span>
                        </td>
                        <td>
                          <Paper>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.product.map((prop, i) => (
                                <tr key={i}>
                                  <td>{prop.productList.name}</td>
                                  <td>
                                    <Typography
                                      className="delete-btn"
                                      onClick={(e) =>
                                        handlDeleteById(prop.id)
                                      }
                                    >
                                      <i className="fas fa-trash-alt" />
                                    </Typography>
                                  </td>
                                </tr>
                              ))}
                            </tbody>

                          </Paper>
                        </td>
                        <td>
                          <button
                            type="button"
                            className={
                              row.status
                                ? "btn btn-sm btn-secondary btn-toggle active"
                                : "btn btn-sm btn-secondary btn-toggle"
                            }
                            data-toggle="button"
                            aria-pressed="true"
                            autoComplete="off"
                            onClick={(e) =>
                              handleStatus(index, e.target.value, row)
                            }
                          >
                            {" "}
                            <div className="handle"></div>{" "}
                          </button>
                        </td>
                        <td className="action-btns">
                          <Edit state={row} />
                          <Typography
                            className="delete-btn"
                            onClick={(e) => CouponHandlDeleteById(row.id)}
                          >
                            <i className="fas fa-trash-alt" />
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
