import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import RichTextEditor from '../../../../../RichTextEditor';
import { GetAttribute, GetProductDetails } from '../../../../../services';
import swal from "sweetalert";

export const Pricecolormanagement = ({ parentCallback, state }) => {
    const [inputList, setInputList] = useState(
        state.ProductVariants.length > 0
            ? state.ProductVariants.map((item) => ({ ...item, readonly: true }))
            : [
                {
                    id: null,
                    longDesc: null,
                    shortDesc: null,
                    specification: null,
                    productName: null,
                    discount: null,
                    discountPer: null,
                    actualPrice: null,
                    netPrice: null,
                    productCode: null,
                    qtyWarning: null,
                    Available: null,
                    unitSize: null,
                    qty: null,
                    color: null,
                    thumbnail: null,
                    galleryImg: null,
                    youTubeUrl: null,
                    stockType: false,
                    refundable: true,
                    COD: null,
                    variationOptions: [], // Initialize as an empty array
                },
            ]
    );


    const [attributeList, setAttributeList] = useState([])
    useEffect(() => {
        async function fetchAttributeList() {
            const AttributeList = await GetAttribute.getAllAttribute();
            setAttributeList(AttributeList.data);
        }
        fetchAttributeList();
    }, []);

    // handleAttributeChange function
    const handleAttributeChange = (e, index, attribute) => {
        const { value } = e.target;
        const list = [...inputList];
        const attributeIndex = list[index]['variationOptions'].findIndex(opt => opt.name === attribute.name);

        if (attributeIndex !== -1) {
            // If the attribute already exists, update its value
            list[index]['variationOptions'][attributeIndex].value = value;
        } else {
            // If the attribute doesn't exist, add it to the list
            list[index]['variationOptions'].push({ name: attribute.name, value: value });
        }
        setInputList(list);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];

        if (name === 'TITLE') {
            list[index].color.TITLE = value;
        } else {
            list[index][name] = value;
        }
        // Handle the case when the discount is changed, and adjust discountPer accordingly
        if (name === 'discount') {
            if (value !== null && list[index]['actualPrice'] !== null) {
                list[index]['discountPer'] = (value / list[index]['actualPrice']) * 100;
                list[index]['netPrice'] = (list[index]['actualPrice'] - value);
            } else {
                list[index]['discountPer'] = null;
            }
        }
        if (name === 'discountPer') {
            const discountPercent = value; // define value as discountPercent
            const actualPrice = list[index]['actualPrice'];
            const discount = Math.round((discountPercent / 100) * actualPrice); // update discount based on discountPercent
            list[index]['netPrice'] = Math.round(actualPrice - discount);
            list[index]['discount'] = discount; // update discount value
        }
        // Handle the case when actualPrice is changed, and adjust discountPer accordingly
        if (name === 'actualPrice') {
            const discount = list[index]['discount'];
            if (value !== null && discount !== null) {
                list[index]['discountPer'] = (discount / value) * 100;
                list[index]['discountPer'] = (discount / value) * 100;
            } else {
                list[index]['discountPer'] = null;
            }
        }

        setInputList(list);
    };


    const handleContentChange = (contentHtml, index) => {
        const list = [...inputList];
        list[index].longDesc = contentHtml;
        setInputList(list);
    };

    const handleShortDesc = (contentHtml, index) => {
        const list = [...inputList];
        list[index].shortDesc = contentHtml;
        setInputList(list);
    };

    const handlProductVarient = (id) => {
        console.log("getids", id)
        swal({
            title: "Are you sure?",
            text: "You want to delete product",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
            if (success) {
                let value = await GetProductDetails.getProductVarient(id);
                window.location.reload()
                window.location.href = "/admin/seller/product-detail/list/history"
            }
        });
    };

    const handleAddClick = () => {
        setInputList(prevInputList => [
            ...prevInputList,
            {
                id: null,
                longDesc: null,
                shortDesc: null,
                specification: null,
                productName: null,
                discount: null,
                discountPer: null,
                actualPrice: null,
                netPrice: null,
                productCode: null,
                qtyWarning: null,
                Available: null,
                unitSize: null,
                qty: null,
                color: null,
                thumbnail: null,
                galleryImg: null,
                youTubeUrl: null,
                stockType: false,
                refundable: true,
                COD: null,
                variationOptions: [],
            },
        ]);
    };

    useEffect(() => {
        // Move this outside of the functions
        parentCallback(inputList);
    }, [inputList])

    console.log("inputList***", inputList)
    console.log("attributeList***", attributeList)

    return (
        <Grid >

            {inputList.map((x, i) => (
                <Grid key={i} container spacing={2} style={i % 2 ? { marginTop: '3rem', background: 'rgb(195 232 191 / 25%)' } : {marginTop: '3rem', background: '#DAF7A6' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '100%', boxSizing: 'border-box' }}>
                        <div className="card-header">
                            <h5 className="mb-0 h6">{i+1}. Product Varient</h5>
                        </div>
                        {attributeList.map((attribute, key) => (
                            attribute.name && (
                                <div key={key} style={{ width: '100%', boxSizing: 'border-box' }} className='p-2' >
                                    <label className="form-label font-weight-bold">{attribute.name}*</label>
                                    <select
                                        name="variationOptions"
                                        value={(x.variationOptions.find(Op => Op.name === attribute.name) || { value: '' }).value}
                                        onChange={(e) => handleAttributeChange(e, i, attribute)}
                                        style={{
                                            backgroundColor: '#fff',
                                            color: '#000',
                                            padding: '15px',
                                            fontSize: '16px',
                                            width: '100%',
                                            border: 'none',
                                            marginBottom: '10px'
                                        }}
                                    >
                                        <option value="">Select {attribute.name}</option>

                                        {attribute.AttributeValues.map((val, index) => (
                                            <option key={index} value={val.value}>
                                                {val.value}
                                            </option>
                                        ))}

                                        {x.variationOptions.map((opt, index) => {
                                            if (opt.name === attribute.name) {
                                                return (
                                                    <option key={index} value={opt.value}>
                                                        {opt.value}
                                                    </option>
                                                );
                                            }
                                            return null;
                                        })}
                                    </select>
                                </div>
                            )
                        ))}
                    </div>

                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Product Name<span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            name="productName"
                            placeholder="ex: Enter product name"
                            defaultValue={x.productName}
                            onChange={(e) => handleInputChange(e, i)}
                        />
                    </Grid>
                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Product Code<span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            name="productCode"
                            placeholder="ex: FGSTW"
                            defaultValue={x.productCode}
                            onChange={(e) => handleInputChange(e, i)}

                        />
                    </Grid>

                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Stock Visibility*</label>
                        <select className="form-control" name="stockType" onChange={(e) => handleInputChange(e, i)} defaultValue={x.stockType}>
                            <option >Select type</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </Grid>
                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Refundabe*</label>
                        <select className="form-control" name="refundable" onChange={(e) => handleInputChange(e, i)} defaultValue={x.refundable}>
                            <option >Select type</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </Grid>
                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Stock Quantity warning*</label>
                        <input
                            className="form-control"
                            name="qtyWarning"
                            placeholder="ex: 100"
                            defaultValue={x.qtyWarning}
                            onChange={(e) => handleInputChange(e, i)}

                        />
                    </Grid>

                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Stock Quantity*</label>
                        <input
                            className="form-control"
                            name="qty"
                            placeholder="ex: 100"
                            defaultValue={x.qty}
                            onChange={(e) => handleInputChange(e, i)}

                        />
                    </Grid>

                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Cash On Delivery*</label>
                        <select className="form-control" name="COD" onChange={(e) => handleInputChange(e, i)} defaultValue={x.COD} >
                            <option >Select type</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </Grid>

                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Available*</label>
                        <select className="form-control" name="Available" onChange={(e) => handleInputChange(e, i)} defaultValue={x.Available} >
                            <option >Select type</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </Grid>

                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Your Selling Price*</label>
                        <input
                            className="form-control"
                            name="actualPrice"
                            placeholder="ex: 1"
                            value={x.actualPrice}
                            onChange={(e) => handleInputChange(e, i)}

                        />
                    </Grid>

                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Discount*</label>
                        <input
                            className="form-control"
                            name="discount"
                            placeholder="ex: 1"
                            value={x.discount}
                            onChange={(e) => handleInputChange(e, i)}

                        />
                    </Grid>

                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">Discount Percent*</label>
                        <input
                            className="form-control"
                            name="discountPer"
                            placeholder="ex: 1"
                            value={x.discountPer}
                            onChange={(e) => handleInputChange(e, i)}

                        />
                    </Grid>

                    <Grid item md={3} lg={3}>
                        <label className="form-label font-weight-bold">MRP Price<span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            name="netPrice"
                            placeholder="ex: 100"
                            value={x.netPrice}
                            onChange={(e) => handleInputChange(e, i)}

                        />
                    </Grid>

                    <Grid item md={6} lg={6}>
                        <label className="form-label font-weight-bold">YouTube Video Url*</label>
                        <input
                            className="form-control"
                            name="youTubeUrl"
                            placeholder="ex: https://youtu.be/nqWZV_OYVIk"
                            defaultValue={x.youTubeUrl}
                            onChange={(e) => handleInputChange(e, i)}
                        />
                    </Grid>

                    <div className='m-2'>
                        <Grid container spacing={2}>
                            <Grid item md={6} lg={6} >
                                <label className="form-label font-weight-bold">Long Description*</label>
                                <RichTextEditor
                                    content={x.longDesc}
                                    handleContentChange={e => handleContentChange(e, i)}
                                    placeholder="insert text here..."
                                    onChange={(e) => handleInputChange(e, i)}
                                />
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <label className="form-label font-weight-bold"><b>Short Description*</b></label>
                                <RichTextEditor
                                    content={x.shortDesc}
                                    handleContentChange={e => handleShortDesc(e, i)}
                                    placeholder="insert text here..."
                                    onChange={(e) => handleInputChange(e, i)}
                                />
                            </Grid>
                        </Grid>
                    </div>



                    <Grid item md={12} lg={12}>
                        <div className="btn-box" style={{ marginTop: '1rem' }}>
                            {inputList.length !== 1 && <Button
                                variant="contained"
                                onClick={() => handlProductVarient(x.id)} style={{ marginRight: '1rem' }}>Remove</Button>
                            }
                            {inputList.length - 1 === i && <Button variant="contained" onClick={handleAddClick}>Add</Button>}
                        </div>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}

export default Pricecolormanagement;


