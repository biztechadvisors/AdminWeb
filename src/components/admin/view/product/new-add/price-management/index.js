import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import RichTextEditor from '../../../../../RichTextEditor';

const Pricecolormanagement = ({ parentCallback }) => {
    const [inputList, setInputList] = useState([
        {
            productName: '',
            productCode: '',
            actualPrice: '',
            memory: '',
            qty: '',
            colorCode: '',
            discountPer: '',
            discount: '',
            netPrice: '',
            longDesc: '', 
            shortDesc: '',
        },
    ]);

    const calculateNetPrice = (index) => {
        const list = [...inputList];
        const item = list[index];

        if (item.discount !== '' && item.actualPrice !== '') {
            item.netPrice = item.actualPrice - item.discount;
            item.discountPer = (item.discount / item.actualPrice) * 100;
        } else if (item.netPrice !== '' && item.actualPrice !== '') {
            item.discount = item.actualPrice - item.netPrice;
            item.discountPer = (item.discount / item.actualPrice) * 100;
        } else if (item.netPrice !== '' && item.discountPer !== '') {
            item.actualPrice = item.netPrice / (1 - item.discountPer / 100);
            item.discount = item.actualPrice * (item.discountPer / 100);
        } else if (item.discountPer !== '' && item.actualPrice !== '') {
            item.discount = (item.actualPrice * item.discountPer) / 100;
            item.netPrice = item.actualPrice - item.discount;
        }

        list[index] = item;
        setInputList(list);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;

        // Handle the case when the discount is changed, and adjust discountPer accordingly
        if (name === 'discount') {
            if (value !== '' && list[index]['actualPrice'] !== '') {
                list[index]['discountPer'] = (value / list[index]['actualPrice']) * 100;
            } else {
                list[index]['discountPer'] = '';
            }
        }
        
        setInputList(list);
        parentCallback(list);
        calculateNetPrice(index);
    };

    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([
            ...inputList,
            {
                productName: '',
                productCode: '',
                actualPrice: '',
                memory: '',
                qty: '',
                colorCode: '',
                discountPer: '',
                discount: '',
                netPrice: '',
                longDesc: '', 
                shortDesc: '', 
            },
        ]);
    };

    return (
        <Grid>
            <label>Price List</label>
            {inputList.map((x, i) => {
                return (
                    <div className="row price_list_details" key={i}>
                        <div className="col-md-3">
                            <TextField
                                label="Product Name*"
                                name="productName"
                                placeholder="ex: Bultra"
                                value={x.productName}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <TextField
                                label="Product Code*"
                                name="productCode"
                                placeholder="ex: FGSTW"
                                value={x.productCode}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-2">
                            <TextField
                                label="Quantity*"
                                name="qty"
                                placeholder="ex: 1"
                                value={x.qty}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-2">
                            <TextField
                                label="Age*"
                                name="memory"
                                placeholder="ex: 1 to 2 Yrs"
                                value={x.memory}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <TextField
                                label="Color Code*"
                                name="colorCode"
                                placeholder="ex: "
                                value={x.colorCode}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <TextField
                                label="Actual Price*"
                                name="actualPrice"
                                placeholder="ex: 100"
                                value={x.actualPrice}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <TextField
                                label="Discount(%)"
                                name="discountPer"
                                placeholder="ex: 1"
                                value={x.discountPer}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <TextField
                                label="Discount Price*"
                                name="discount"
                                placeholder="ex: 1"
                                value={x.discount}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <TextField
                                label="Net Price*"
                                name="netPrice"
                                placeholder="ex: 1"
                                value={x.netPrice}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="row" style={{ paddingTop: '2rem' }}>
                            <div className="col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label className="form-label">Long Description*</label>
                                    <RichTextEditor
                                        content={x.longDesc}
                                        handleContentChange={(content) => handleInputChange({ target: { name: 'longDesc', value: content } }, i)}
                                        placeholder="Insert long description here..."
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label className="form-label">Short Description*</label>
                                    <RichTextEditor
                                        content={x.shortDesc}
                                        handleContentChange={(content) => handleInputChange({ target: { name: 'shortDesc', value: content } }, i)}
                                        placeholder="Insert short description here..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="btn-box" style={{ marginTop: '2rem' }}>
                                {inputList.length !== 1 && (
                                    <Button variant="contained" onClick={() => handleRemoveClick(i)} style={{ marginRight: '1rem' }}>
                                        Remove
                                    </Button>
                                )}
                                {inputList.length - 1 === i && <Button variant="contained" onClick={handleAddClick}>Add</Button>}
                            </div>
                        </div>
                    </div>
                );
            })}
        </Grid>
    );
};

export default Pricecolormanagement;
