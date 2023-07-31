import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import RichTextEditor from '../../../../../RichTextEditor';

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
                    productCode: null,
                    distributorPrice: null,
                    buyerPrice: null,
                    unitSize: null,
                    qty: 1,
                    colorId: null,
                    thumbnail: null,
                    galleryImg: null,
                    youTubeUrl: null,
                    stockType: false,
                    refundable: true,
                    qtyWarning: null,
                    COD: null,
                },
            ]
    );

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];

        if (name === 'TITLE') {
            list[index].color.TITLE = value;
          }else{
            list[index][name] = value;
          }
        // Handle the case when the discount is changed, and adjust discountPer accordingly
        if (name === 'discount') {
            if (value !== '' && list[index]['actualPrice'] !== '') {
                list[index]['discountPer'] = (value / list[index]['actualPrice']) * 100;
            } else {
                list[index]['discountPer'] = '';
            }
        }

        // Handle the case when actualPrice is changed, and adjust discountPer accordingly
        if (name === 'actualPrice') {
            const discount = list[index]['discount'];
            if (value !== '' && discount !== '') {
                list[index]['discountPer'] = (discount / value) * 100;
            } else {
                list[index]['discountPer'] = '';
            }
        }

        setInputList(list);
        parentCallback(list);
    };

    const handleAddClick = () => {
        console.log(inputList,"Inputlist")
        parentCallback(inputList);
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


    return (
        <Grid >
            <div>
            </div>
            {/* <label>Product Price</label> */}
            {inputList.map((x, i) => {
                return (
                    <Grid key={i} container spacing={2} style={i % 2 ? { marginTop: '1rem', background: 'rgb(195 232 191 / 25%)' } : { background: '#DAF7A6' }}>
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
                            <label className="form-label font-weight-bold">Age*</label>
                            <input
                                className="form-control"
                                name="memory"
                                placeholder="ex: 10-12 years old"
                                defaultValue={x.memory}
                                onChange={(e) => handleInputChange(e, i)}

                            />
                        </Grid>
                        <Grid item md={12} lg={12}>
                            <label className="form-label font-weight-bold">Color</label>
                            <input
                                className="form-control"
                                name="color"
                                defaultValue={x.color ? x.color.TITLE : ''}
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
                            <label className="form-label font-weight-bold">Stock Quantity*</label>
                            <input
                                className="form-control"
                                name="qtyWarning"
                                placeholder="ex: 100"
                                defaultValue={x.qtyWarning}
                                onChange={(e) => handleInputChange(e, i)}

                            />
                        </Grid><Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Cash On Delivery*</label>
                            <select className="form-control" name="COD" onChange={(e) => handleInputChange(e, i)} defaultValue={x.COD} >
                                <option >Select type</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">MRP Price<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="netPrice"
                                placeholder="ex: 100"
                                defaultValue={x.netPrice}
                                onChange={(e) => handleInputChange(e, i)}

                            />
                        </Grid>
                        <Grid item md={3} lg={3}>
                            <label className="form-label font-weight-bold">Your Selling Price*</label>
                            <input
                                className="form-control"
                                name="actualPrice"
                                placeholder="ex: 1"
                                defaultValue={x.actualPrice}
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
                        <Grid item md={6} lg={6}>
                            <label className="form-label font-weight-bold"><b>Short Description*</b></label>
                            <RichTextEditor
                                content={x.shortDesc}
                                handleContentChange={e => handleShortDesc(e, i)}
                                placeholder="insert text here..."
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </Grid>
                        <Grid item md={6} lg={6}>
                            <label className="form-label font-weight-bold">Long Description*</label>
                            <RichTextEditor
                                content={x.longDesc}
                                handleContentChange={e => handleContentChange(e, i)}
                                placeholder="insert text here..."
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </Grid>
                    </Grid>
                );
            })}

        </Grid>
    )
}

export default Pricecolormanagement;