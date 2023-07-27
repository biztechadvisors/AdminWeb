import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';

export const Pricecolormanagement = ({ parentCallback }) => {
    const [inputList, setInputList] = useState([
        {
            productName: "",
            productCode: "",
            actualPrice: "",
            memory: "",
            qty: "",
            colorCode: "",
            discountPer: "",
            discount: "",
            netPrice: "",
        },
    ]);

    const calculateNetPrice = (index) => {
        const list = [...inputList];
        const item = list[index];

        if (item.discount && item.actualPrice) {
            item.netPrice = item.actualPrice - item.discount;
            item.discountPer = (item.discount / item.actualPrice) * 100;
        } else if (item.netPrice && item.actualPrice) {
            item.discount = item.actualPrice - item.netPrice;
            item.discountPer = (item.discount / item.actualPrice) * 100;
        } else if (item.netPrice && item.discountPer) {
            item.actualPrice = item.netPrice / (1 - item.discountPer / 100);
            item.discount = item.actualPrice * (item.discountPer / 100);
        } else if (item.discountPer && item.actualPrice) {
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

        // Calculate net price, actual price, and discount if required
        calculateNetPrice(index);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { productName: null, productCode: null, actualPrice: null, memory: null, qty: null, colorCode: null, discountPer: null, discount: null, netPrice: null }]);
    };
    //end block

    return (
        <Grid >
            <label>Price List</label>
            {inputList.map((x, i) => {
                return (
                    <div className="row price_list_details" key={i}>
                        <div className="col-md-3">
                            <label className="form-label">Product Name<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="productName"
                                placeholder="ex: Bultra"
                                value={x.productName}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Product Code<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="productCode"
                                placeholder="ex: FGSTW"
                                value={x.productCode}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Actual Price<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="actualPrice"
                                placeholder="ex: 100"
                                value={x.actualPrice}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Quantity<span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                name="qty"
                                placeholder="ex: 1"
                                value={x.qty}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label">Age*</label>
                            <input
                                className="form-control"
                                name="memory"
                                placeholder="ex: 1 to  Yrs"
                                value={x.unitSize}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Color Code*</label>
                            <input
                                className="form-control"
                                name="colorCode"
                                placeholder="ex: #ffff"
                                value={x.colorCode}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Discount(%)*</label>
                            <input
                                className="form-control"
                                name="discountPer"
                                placeholder="ex: 1"
                                value={x.discountPer}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Discount Price*</label>
                            <input
                                className="form-control"
                                name="discount"
                                placeholder="ex: 1"
                                value={x.discount}
                                disabled
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                
                        <div className="col-md-3">
                            <label className="form-label">netPrice*</label>
                            <input
                                className="form-control"
                                name="netPrice"
                                placeholder="ex: 1"
                                value={x.netPrice}
                                disabled
                                onChange={e => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="col-md-3">
                            <div className="btn-box" style={{ marginTop: '2rem' }}>
                                {inputList.length !== 1 && <Button
                                    variant="contained"
                                    onClick={() => handleRemoveClick(i)} style={{ marginRight: '1rem' }}>Remove</Button>}
                                {inputList.length - 1 === i && <Button variant="contained" onClick={handleAddClick}>Add</Button>}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* <button className=" btn btn-success col-sm-3 mt-3 py-2" onClick={caculationTable}>Add Category</button> */}
        </Grid>
    )
}

export default Pricecolormanagement
