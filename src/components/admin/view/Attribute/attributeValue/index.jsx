import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../loader";
import swal from "sweetalert";
import { NotificationManager } from "react-notifications";
import { GetAttribute, GetProductDetails } from "../../../../services";
import { useParams } from 'react-router-dom';

const AttributeValue = () => {
    const [state, setState] = useState({
        value: "",
        meta: "",
        name: ""
    });

    const [list, setList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            let p = await GetAttribute.getAllAttribute(id);
            if (p) {
                setList(p.data);
            }
        }
        fetchData();
    }, []);

    const onHandleChange = (event, fieldName) => {
        const { value } = event.target;
        setState((prev) => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoaded(true);
        const formData = {
            id: list.id,
            name: state.name
        }
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        swal({
            title: "Are you sure?",
            text: "You want to add Attribute",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
            if (success) {
                let list = await GetAttribute.attributeAdd(formData, config);
                if (list) {
                    NotificationManager.success("Successfully Submitted");
                    setIsLoaded(false);
                    window.location.reload();
                } else {
                    NotificationManager.error("Something occurred");
                    setIsLoaded(false);
                }
            }
        });
    };

    const handleSubmitValue = (event) => {
        event.preventDefault();
        setIsLoaded(true);
        const formData = {
            value: state.value,
            meta: state.meta,
            attribute_id: list.id
        }
        console.log("FormData", formData)
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        swal({
            title: "Are you sure?",
            text: "You want to add Attribute Value",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
            if (success) {
                let list = await GetAttribute.attributeValuesAdd(formData, config);
                if (list) {
                    NotificationManager.success("Successfully Submitted");
                    setIsLoaded(false);
                    window.location.reload();
                } else {
                    NotificationManager.error("Something occurred");
                    setIsLoaded(false);
                }
            }
        });
    };

    const handleDeleteById = (data) => {
        console.log("Delete-id", data.id)
        setIsLoaded(true);
        swal({
            title: "Are you sure?",
            text: "You want to delete Attribute Value from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
            if (success) {
                let value = await GetAttribute.getDeleteAttributeValue(data.id);
                if (value) {
                    NotificationManager.success("Successfully Deleted");
                    window.location.reload();
                    setIsLoaded(false);
                } else {
                    setIsLoaded(false);
                    NotificationManager.error("Error");
                }
            } else {
                setIsLoaded(false);
            }
        });
    };

    return (
        <div id="layoutSidenav_content">
            <div className="container-fluid">
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">
                        <a href="/">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="/admin/product/create">Attribute's</a>
                    </li>
                    <li className="breadcrumb-item active">Attribute-List</li>
                </ol>
                <div className="row">
                    {isLoaded ? <Loader /> : ""}
                    <div style={{ display: "flex" }}>
                        <div className="col-lg-5 col-md-5">
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2">
                                    <h4>Attribute Name*</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="news-content-right pd-20">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3">
                                                <div className="form-group">
                                                    <label className="form-label">Name*</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder={list.name}
                                                        name="name"
                                                        value={state.name}
                                                        onChange={(event) => onHandleChange(event, "name")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-2">
                                                <div className="form-group">
                                                    <button
                                                        className="save-btn hover-btn"
                                                        type="submit"
                                                        onClick={handleSubmit}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-7">
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2">
                                    <h4>Attribute Value*</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="news-content-right pd-20">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3">
                                                <div className="form-group">
                                                    <label className="form-label">Value*</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="ex: value..."
                                                        name="value"
                                                        value={state.value}
                                                        onChange={(event) => onHandleChange(event, "value")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3">
                                                <div className="form-group">
                                                    <label className="form-label">Meta*</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="ex: meta..."
                                                        name="meta"
                                                        value={state.meta}
                                                        onChange={(event) => onHandleChange(event, "meta")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-2">
                                                <div className="form-group">
                                                    <button
                                                        className="save-btn hover-btn"
                                                        type="submit"
                                                        onClick={handleSubmitValue}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        {isLoaded ? <Loader /> : ""}
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "20px" }}>S.N</th>
                                                <th style={{ width: "100px" }}>Value</th>
                                                <th style={{ width: "100px" }}>Meta</th>
                                                <th style={{ width: "100px" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list.AttributeValues
                                                ? list.AttributeValues.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td style={{ width: "100px" }}>{row.value}</td>
                                                        <td style={{ width: "100px" }}>{row.meta}</td>
                                                        <td>
                                                            <span
                                                                // className="delete-btn"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={(e) => handleDeleteById(row)}
                                                            >
                                                                <i className="fas fa-trash-alt" />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                                : "No data"}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default AttributeValue;