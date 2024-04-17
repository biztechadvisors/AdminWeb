import React, { Component } from 'react';
import { Button, Paper } from "@material-ui/core";
import { GetCategoryDetails, GetProductDetails } from '../../../../services';
import Pricecolormanagement from './price-management';
import SpecificationList from './specification';
import HighLightList from './HighLight';
import ImageDetail from './Image-field';
import Loader from "../../../../loader";
import swal from 'sweetalert';
import MainCategorylist from '../../../../common/category/main-category';
import SubCategorylist from '../../../../common/category/sub-category';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        const data = this.props.location.state;
        // console.log("Data", data)

        this.state = {
            id: data ? data.id : null,
            getList: [], getsublist: [],
            selectedCategory: data.maincat.id,
            selectedSubCategory: data.SubCategory.id,
            mainCatName: data.maincat.name,
            subCatName: data.SubCategory.sub_name,
            name: data.name,
            collection: data.collection,
            isLoaded: false,
            priceDetails: [],
            SpecificationDetails: data.ch_specifications,
            PubilshStatus: data.PubilshStatus,
            HighLightDetais: data.HighLightDetail,
            ShippingDays: data.ShippingDays,
            LocalDeiveryCharge: data.LocalDeiveryCharge,
            ZonalDeiveryCharge: data.ZonalDeiveryCharge,
            NationalDeiveryCharge: data.NationalDeiveryCharge,
            warrantyType: data.WarrantyType,
            warrantyPeriod: data.WarrantyPeriod,
            ProductVarient: data,
            brandId: "",
            referSizeChart: data.referSizeChart,
            material: data.material,
        };

        // Bind necessary functions
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange = (e) => {
        // console.log('index---e', e)
        this.setState({ [e.target.name]: e.target.value });
    }


    handleCategory = async (value) => {
        try {
            this.setState({ selectedCategory: value });
            // console.log("selectedCategory-main", this.state.selectedCategory);
            let categoryId = value;
            let list = await GetCategoryDetails.getSelectSubCategory(categoryId);
            this.setState({ getList: list.data });
        } catch (error) {
            console.error("Error fetching category details:", error);
        }
    }

    handleSubCategory = async (value) => {
        try {
            this.setState({ selectedSubCategory: value });
            // console.log("selectedSubCategory-sub", this.state.selectedSubCategory);
            let list = await GetCategoryDetails.getAllSubChildCategory(value);
            this.setState({ getsublist: list.data, blockHide: !this.state.blockHide });
        } catch (error) {
            console.error("Error fetching subcategory details:", error);
        }
    }

    async componentDidMount() {
        try {
            await this.handleCategory(); // Call handleCategory to fetch category data
            await this.handleSubCategory(this.state.selectedSubCategory); // Pass the initial selected subcategory
        } catch (error) {
            console.error("Error in componentDidMount:", error);
        }
    }

    handleBack() {
        this.props.history.goBack();
    }

    onFileChange = event => {
        this.setState({ image: event.target.files[0] });
    };

    handleContentChange = contentHtml => {
        this.setState({
            content: contentHtml
        });
    };

    callback = (data) => {
        // console.log('data--callback', data)
        this.setState({ priceDetails: data });
    }

    SpecificationCallBack = (data) => {
        this.setState({ SpecificationDetails: data })
    }
    handleHightLight = (data) => {
        this.setState({ HighLightDetais: data })
    }

    async handleUpdate() {
        const {
            mainCatName,
            subCatName,
            selectedCategory,
            selectedSubCategory,
            name,
            PubilshStatus,
            LocalDeiveryCharge,
            ShippingDays,
            brandId,
            priceDetails,
            SpecificationDetails,
            HighLightDetais,
            warrantyType,
            warrantyPeriod,
            collection,
            id,
            material,
            referSizeChart
        } = this.state;

        const formData = {
            productId: id,
            mainCatName,
            subCatName,
            selectedCategory,
            selectedSubCategory,
            name,
            PubilshStatus,
            LocalDeiveryCharge,
            ShippingDays,
            brandId,
            priceDetails,
            SpecificationDetails,
            HighLightDetais,
            warrantyType,
            warrantyPeriod,
            collection,
            material,
            referSizeChart,
        }

        // console.log('formData', formData)
        swal({
            title: "Are you sure?",
            text: "You want to Update",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
            if (success) {
                // console.log(formData);
                try {
                    const res = await GetProductDetails.getUpdateProduct(formData);
                    this.setState({ showAlert: true });
                    window.location.href = "/admin/seller/product-detail/list/history"
                }
                catch (err) {
                    swal("error", err);
                }
            }
        }
        )
    }
    render() {
        const {
            mainCatName,
            subCatName,
            name,
            material,
            referSizeChart,
            PubilshStatus,
            LocalDeiveryCharge,
            ShippingDays,
            collection,
            getList,
        } = this.state;

        const collection_name = collection ? collection.name : "";
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Products</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>

                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/admin/product/create">Products</a></li>
                    <li className="breadcrumb-item active">update</li>
                </ol>
                {
                    this.state.isLoaded ? <Loader /> : ''
                }
                <ul className="breadcrumb mb-30 nav nav-pills my-4" id="pills-tab" role="tablist" >
                    <li className="nav-item ">
                        <a className="nav-link show active" id="pills-one-tab" data-toggle="pill" href="#pills-one" role="tab" aria-controls="pills-one" aria-selected="true">Info</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link show " id="pills-two-tab" data-toggle="pill" href="#pills-two" role="tab" aria-controls="pills-two" aria-selected="false">Product Info</a>
                    </li>
                    <li className="nav-item ml-auto updater-btn">
                        <Button type="submit" onClick={this.handleUpdate}>Update</Button>
                    </li>
                </ul>

                <div className="tab-content" id="pills-tabContent">
                    {/* TAB - 1 */}
                    <div className="tab-pane fade active show" id="pills-one" role="tabpanel" aria-labelledby="pills-one-tab">
                        <div className="row">
                            <div className="col-lg-7 col-md-7">
                                <Paper>
                                    <div className="card-header">
                                        <h5 className="mb-0 h6">Category Info</h5>
                                    </div>
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-body-table">
                                            <div className="news-content-right p-2">
                                                <div className="form-group">
                                                    <label className="form-label">Main Category<span className="text-danger">*</span></label>

                                                    <MainCategorylist
                                                        value={{
                                                            id: this.state.selectedCategory,
                                                            label: mainCatName
                                                        }}
                                                        onSelectCategory={this.handleCategory}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card card-static-2">
                                            <div className="card-body-table p-2">
                                                <div className="form-group">
                                                    <label className="form-label">Sub Category<span className="text-danger">*</span></label>

                                                    <SubCategorylist
                                                        state={getList}
                                                        value={{
                                                            id: this.state.selectedSubCategory,
                                                            label: subCatName
                                                        }}
                                                        onSelectSubCategory={this.handleSubCategory}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>

                                <Paper>
                                    <div className="card card-static-2">
                                        <div className="card-body-table p-2">
                                            <div className="form-group">
                                                <label className="form-label">Product Name<span className="text-danger">*</span></label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name='name'
                                                    defaultValue={name}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="card-body-table p-2">
                                            <div className="form-group">
                                                <label className="form-label">Material<span className="text-danger">*</span></label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name='material'
                                                    defaultValue={material}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="card-body-table p-2">
                                            <div className="form-group">
                                                <label className="form-label">Refer Size Chart<span className="text-danger">*</span></label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name='referSizeChart'
                                                    defaultValue={referSizeChart}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Paper>

                                <Paper>
                                    <div className="card-header">
                                        <h5 className="mb-0 h6">Collection Info</h5>
                                    </div>
                                    <div className="form-group mb-3 pd-20">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                name="collection"
                                                defaultValue={this.state.collection ? this.state.collection.id : 0}
                                                onChange={this.handleChange}
                                            >
                                                <option >Select type</option>
                                                <option value="0">New Arrivals</option>
                                                <option value="1">Best Sellers</option>
                                                <option value="2">Sale Items</option>
                                            </select>
                                        </div>
                                    </div>
                                </Paper>

                                <Paper >
                                    <div className="card-header">
                                        <h5 className="mb-0 h6">Publish Status</h5>
                                    </div>
                                    <div className="form-group mb-3 pd-20">
                                        <label htmlFor="name">
                                            Type
                                        </label>
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                name="PubilshStatus"
                                                defaultValue={this.state.PubilshStatus}
                                                onChange={this.handleChange}
                                            >
                                                <option >Select type</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Unpublished">Unpublished</option>
                                                <option value="Published">Published</option>
                                            </select>
                                        </div>
                                    </div>
                                </Paper>

                            </div>
                            <div className="col-lg-5 col-md-5">
                                <Paper>
                                    <div className="card-header">
                                        <h5 className="mb-0 h6">Shipping Configuration</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <label className="col-md-4 form-label">Delivery Charge</label>
                                            <div className="col-md-8">
                                                <input
                                                    className="form-control"
                                                    placeholder="ex:Rs.50"
                                                    type="number"
                                                    name="LocalDeiveryCharge"
                                                    defaultValue={LocalDeiveryCharge}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                                <Paper className="mt-3">
                                    <div className="card-header">
                                        <h5 className="mb-0 h6">Estimate Shipping Time</h5>
                                    </div>
                                    <div className="form-group mb-3 pd-20">
                                        <label htmlFor="name">
                                            Shipping Days
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="ShippingDays"
                                                defaultValue={ShippingDays}
                                                onChange={this.handleChange}
                                                placeholder="ex:3 days"
                                            />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupPrepend">days</span>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                                <Paper className="mt-3">
                                    <ImageDetail />
                                </Paper>
                            </div>
                        </div>
                    </div>

                    {/* tab 2 */}
                    <div className="tab-pane fade" id="pills-two" role="tabpanel" aria-labelledby="pills-two-tab">
                        <div className="row" >
                            <div className="col-lg-12 col-md-12">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-header">
                                        <h5 className="mb-0 h6">Add New Product</h5>
                                    </div>
                                    <div className="card-body-table">
                                        <div className="news-content-right">
                                            <Paper style={{ padding: '1rem', background: '#f7f7f' }} className='ml-4 mr-4'>
                                                <div className="row" >
                                                    <div className="col-lg-12 col-md-12">
                                                        <Pricecolormanagement parentCallback={this.callback} state={this.state.ProductVarient} />
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}