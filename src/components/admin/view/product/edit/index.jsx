import React, { Component } from 'react';
import { Button, Paper } from "@material-ui/core";
import MainCategorylist from '../../../../common/category/main-category';
import { GetCategoryDetails } from '../../../../services';
import SubCategorylist from '../../../../common/category/sub-category';
import Brandlist from '../../../../common/brand';
import { GetProductDetails } from '../../../../services';
import RichTextEditor from '../../../../RichTextEditor';
import Loader from '../../../../loader';
import { NotificationManager } from 'react-notifications';
import Pricedetails from './pricedetails';
import Seomaster from '../../seo';
import swal from 'sweetalert';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        let self = this.props.location.state.row;

        console.log("data", self)
        let value = self.status === "active" ? 1 : 0;
        this.state = {
            getList: [],
            getcatlist: [],
            image: null, // Set initial value to null
            toggle: false,
            loading: false,
            blockHide: false,
            productId: self.id,
            catId: self.categoryId,
            subCatId: self.subCategoryId,
            name: self.name,
            slug: self.slug,
            brandId: self.brandId,
            status: value,
            content: self.desc,
            ProductVarient: self,
            referSizeChart: self.referSizeChart,
            material: self.material
        };
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

    handleContentChange = contentHtml => {
        this.setState({
            content: contentHtml
        });
    };
    handleCategory = async (value) => {
        console.log('58***', value)
        this.setState({ selectedCategory: value });
        let categoryId = value;
        console.log('60***', categoryId)
        let catList = await GetCategoryDetails.getCategoryList(categoryId);
        let list = await GetCategoryDetails.getSelectSubCategory(categoryId);
        this.setState({ getList: list.data })
        this.setState({ getcatlist: catList.data.filter((item) => item.id === categoryId) })
    }
    handleSubCategory = async (value) => {
        this.setState({ selectedSubCategory: value });
    }

    callback = (data) => {
        console.log(data, "productData")
        this.setState({ priceDetails: data })
    }
    convertToSlug(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
    handleBrandList = async (value) => {
        this.setState({ brandId: value });
    };
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { productId, image, name, selectedCategory, selectedSubCategory, referSizeChart, material, status, brandId, unit, content, priceDetails, getcatlist, getList, } = this.state;
        let slug = this.convertToSlug(name)

        const subcatName = getList.filter((item) => item.id === selectedSubCategory);

        const formData = {
            productId: productId,
            slug: slug,
            mainCatName: getcatlist[0].name,
            name: name,
            subCatName: subcatName[0].sub_name,
            photo: image,
            desc: content,
            priceDetails,
            referSizeChart: referSizeChart,
            material: material
        }
        console.log(formData);

        // console.log(formData, "price")
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };

        swal({
            title: "Are you sure?",
            text: "You want to Update Product",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    console.log("success", formData)
                    let list = await GetProductDetails.getUpdateProduct(formData);
                    if (list) {
                        this.setState({ loading: false })
                        this.props.history.push("/admin/product/list")
                    } else {
                        this.setState({ loading: false })
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                } else {
                    this.setState({ loading: false })
                }
            });
    }
    render() {
        const { loading, getList } = this.state;
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
                    <li className="breadcrumb-item active">Update Product</li>
                </ol>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="card card-static-2 mb-30">
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
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Update Product</h4>
                            </div>
                            <div className="card-body-table">
                                {
                                    loading ? <Loader /> : ''
                                }
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
                                                <label className="form-label">Slug*</label>
                                                <input type="text" className="form-control" placeholder="Enter Slug" name="slug" value={this.state.slug} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">Brand*</label>
                                                <Brandlist onSelectBrand={this.handleBrandList} />
                                                <input type="text" className="form-control" placeholder="Brand Name" name="brand" defaultValue={this.state.brand} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">Product Image*</label>
                                                <input type="file" className="form-control" name="image" onChange={this.onFileChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3">
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
                                    <div className="row" style={{ paddingTop: '2rem' }}>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Description*</label>
                                                <RichTextEditor
                                                    content={this.state.content}
                                                    handleContentChange={this.handleContentChange}
                                                    placeholder="insert text here..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Paper style={{ marginBottom: '2rem', padding: '1rem', marginTop: '1rem', background: '#f7f7f' }}>
                                        <div className="row" >
                                            <div className="col-lg-12 col-md-12">
                                                <Pricedetails parentCallback={this.callback} state={this.state.ProductVarient} />
                                            </div>
                                        </div>
                                    </Paper>
                                    <Paper style={{ marginBottom: '2rem', padding: '1rem', marginTop: '1rem', background: '#f7f7f' }}>
                                        <div className="row" >
                                            <div className="col-lg-12 col-md-12">
                                                < Seomaster />
                                            </div>
                                        </div>
                                    </Paper>
                                    <div className="button_price">
                                        <div className="form-group" /* style={this.state.toggle ? { display: 'block' } : { display: 'none' }} */>
                                            <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>
                                                Update
                                            </button>
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

