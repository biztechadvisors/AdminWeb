import React, { Component } from 'react';
import {
    Button, Paper
} from "@material-ui/core";
import MainCategorylist from '../../../../common/category/main-category';
import Brandlist from '../../../../common/brand';
import { GetCategoryDetails } from '../../../../services';
import SubCategorylist from '../../../../common/category/sub-category';
import { GetProductDetails } from '../../../../services';
import RichTextEditor from '../../../../RichTextEditor';
import Loader from '../../../../loader';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import Pricecolormanagement from './price-management';
import ExcelPost from './uploadProdxl';
import "./upload.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class Newproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], getsublist: [], selectedCategory: '', brandId: '', selectedSubCategory: '', blockhide: false, toggle: false, isLoaded: false,
            name: '', slug: '', brand: '', status: 1, unit: '', image: '', desc: '', longDesc: '',
            priceDetails: [], plainString: '', referSizeChart: '', material: ''
        }
        // Bind event handlers
        this.handleBack = this.handleBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleLongDescChange = this.handleLongDescChange.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleSubCategory = this.handleSubCategory.bind(this);
        this.handleBrandList = this.handleBrandList.bind(this);
        this.convertToSlug = this.convertToSlug.bind(this);
        this.callback = this.callback.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onFileChange = event => {
        this.setState({ image: event.target.files[0] });
    };

    handleDescChange = (content) => {
        this.setState({ desc: content }); // Update desc state
    };

    handleLongDescChange = (content) => {
        this.setState({ longDesc: content }); // Update longDesc state
    };

    handleCategory = async (value) => {
        this.setState({ selectedCategory: value });
        let categoryId = value;
        let list = await GetCategoryDetails.getSelectSubCategory(categoryId);
        this.setState({ getList: list.data })
    }
    handleSubCategory = async (value) => {
        this.setState({ selectedSubCategory: value });
        let list = await GetCategoryDetails.getAllSubChildCategory(value);
        this.setState({ getsublist: list.data, blockhide: true })
    }
    handleBrandList = async (value) => {
        this.setState({ brandId: value });
    }
    convertToSlug(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
    // handlePriceDetails = (value)=>{
    // this.setState({ priceDetails: value})
    // }

    callback = (data) => {
        this.setState({ priceDetails: data })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoaded: true });

        const { selectedCategory, selectedSubCategory, longDesc, image, name, brandId, status, content, priceDetails, referSizeChart, material, desc } = this.state;
        let slug = this.convertToSlug(this.state.name);

        const formData = new FormData();
        formData.append('categoryId', selectedCategory);
        formData.append('subCategoryId', selectedSubCategory);
        formData.append('name', name);
        formData.append('slug', slug);
        formData.append('referSizeChart', referSizeChart);
        formData.append('material', material);
        formData.append('brand', brandId);
        formData.append('status', status);
        formData.append('desc', desc); // Use desc state
        formData.append('longDesc', longDesc); // Use longDesc state
        formData.append('photo', image);
        formData.append('productVariants', JSON.stringify(priceDetails));

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        swal({
            title: "Are you sure?",
            text: "You want to Add New Product",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
            if (success && formData) {
                let list = await GetProductDetails.addProductList(formData, config);
                if (list) {
                    console.log('list-105', list);
                    this.setState({ isLoaded: false });
                    this.props.history.push("/admin/shop/seller/all-product");
                } else {
                    this.setState({ isLoaded: false });
                    NotificationManager.error("Please! Check input field", "Input Field");
                }
            } else {
                this.setState({ isLoaded: false });
            }
        });
    };

    render() {
        const { getList, getsublist, isLoaded, priceDetails } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Products</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}>
                            <i className="fas fa-arrow-left" /> Back
                        </Button>
                    </div>
                </div>

                {/* Breadcrumb */}
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/admin/product/create">Products</a></li>
                    <li className="breadcrumb-item active">Add Product</li>
                </ol>

                {/* upload products List ExcelFile */}
                <div className="upload-container">
                    <ExcelPost />
                </div>

                <div className="row" /* style={this.state.blockhide ? { display: 'block' } : { display: 'none' }} */>
                    {
                        isLoaded ? <Loader /> : ''
                    }
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add New Product</h4>
                            </div>
                            <div className="card-body-table">
                                {/* Category and Subcategory */}
                                <div className="row" style={{ marginTop: '3rem' }}>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="card card-static-2 mb-30">
                                            {/* Category */}
                                            <div className="card-body-table">
                                                <div className="news-content-right pd-20">
                                                    <div className="form-group">
                                                        <label className="form-label">Category*</label>
                                                        <MainCategorylist onSelectCategory={this.handleCategory} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="card card-static-2 mb-30">
                                            {/* Subcategory */}
                                            <div className="card-body-table">
                                                <div className="news-content-right pd-20">
                                                    <div className="form-group">
                                                        <label className="form-label">Sub Category*</label>
                                                        <SubCategorylist state={getList} onSelectSubCategory={this.handleSubCategory} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="news-content-right pd-20">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Product Name*</label>
                                                <input type="text" className="form-control" placeholder="Product Name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Collection*</label>
                                                <Brandlist onSelectBrand={this.handleBrandList} />
                                                {/* <input type="text" className="form-control" placeholder="Brand Name" name="brand" value={this.state.brand} onChange={(e) => this.handleChange(e)} /> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 my-2">
                                            <div className="form-group">
                                                <label className="form-label">Product Image*</label>
                                                <input type="file" className="form-control" name="image" onChange={this.onFileChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 my-2">
                                            <div className="form-group">
                                                <label className="form-label">Status*</label>
                                                <select id="status" name="status" className="form-control" value={this.state.status} onChange={(e) => this.handleChange(e)}>
                                                    <option value={1}>Active</option>
                                                    <option value={0}>Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Product Material*</label>
                                                <input type="text" className="form-control" placeholder="Product Material" name="material" value={this.state.material} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Product Refer Size Chart*</label>
                                                <input type="text" className="form-control" placeholder="Product Refer Size Chart" name="referSizeChart" value={this.state.referSizeChart} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="card card-static-2 mb-30">
                                                <div className="card-body-table">
                                                    <div className="news-content-right pd-20">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-12">
                                                                <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Description*</label>
                                                                <ReactQuill
                                                                    value={this.state.desc} // Use desc state
                                                                    onChange={this.handleDescChange}
                                                                    placeholder="Write something..."
                                                                    style={{ height: '200px', marginBottom: '20px' }}
                                                                />
                                                            </div>
                                                            <div className="col-lg-6 col-md-12">
                                                                <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Long Description*</label>
                                                                <ReactQuill
                                                                    value={this.state.longDesc} // Use longDesc state
                                                                    onChange={this.handleLongDescChange}
                                                                    placeholder="Write something..."
                                                                    style={{ height: '200px' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price and Color Management */}
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <Paper style={{ marginBottom: '2rem', padding: '3rem', marginTop: '3rem', background: '#f7f7f' }}>
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12">
                                                        <Pricecolormanagement parentCallback={this.callback} />
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="button_price">
                                                <div className="form-group">
                                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add New Product</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* price and colorlist show */}
                {/* end of pricelist */}
            </div >
        )
    }
}
