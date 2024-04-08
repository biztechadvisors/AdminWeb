import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../loader";
import swal from "sweetalert";
import { NotificationManager } from "react-notifications";
import { GetAttribute, GetProductDetails } from "../../../../services";
import AttributeValue from "../attributeValue";


const List = () => {
    const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let p = await GetAttribute.getAllAttribute();
            if (p) {
                setList(p.data);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoaded(true);
        const formData = { name: name };
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

    const handleDeleteById = (data) => {
        setIsLoaded(true);
        swal({
            title: "Are you sure?",
            text: "You want to delete Attribute from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
            if (success) {
                let value = await GetAttribute.getDeleteAttribute(data.id);
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
                    <div className="col-lg-12 col-md-12">
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
                                                    placeholder="ex: name..."
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
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
                                                    Submit
                                                </button>
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
                                                <th style={{ width: "100px" }}>Name</th>
                                                <th style={{ width: "100px" }}>Slug</th>
                                                <th style={{ width: "100px" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list
                                                ? list.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td style={{ width: "100px" }}>{row.name}</td>
                                                        <td style={{ width: "100px" }}>{row.slug}</td>
                                                        <td>
                                                            <span>
                                                                <a className="fas fa-edit" href={`/admin/Attribute/attributeValue/${row.id}`}>
                                                                    Add Attribute Values
                                                                </a>
                                                            </span>
                                                            <span
                                                                // className="delete-btn"
                                                                className="pl-4"
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




export default List;