import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
// import { useHistory } from "react-router-dom";

export const Pricedetails = ({ parentCallback, state }) => {
    // const history = useHistory();
    // const dispatch = useDispatch();

    // add new block
    const [inputList, setInputList] = useState(state.ProductVariants.length > 0 ? state.ProductVariants.map(item => ({ ...item, readonly: true })) : [{ productName: null, productCode: null, actualPrice: null, distributorPrice: null, marginPer: null, marginPrice: null, buyerPrice: null, sellerPrice: null, unitSize: null, qty: null, colorCode: null, discountPer: null, discount: null, netPrice: null }]);
    //end

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;

        if (name === 'discount') {
            const discount = value; // rename discount to discount
            list[index]['discountPer'] = Math.round((discount / list[index]['actualPrice']) * 100);
            list[index]['netPrice'] = Math.round(list[index]['actualPrice'] - discount);
        } else if (name === 'actualPrice') {
            const actualPrice = value; // define value as actualPrice
            const discount = list[index]['discount'];
            list[index]['discountPer'] = Math.round((discount / actualPrice) * 100);
            list[index]['netPrice'] = Math.round(actualPrice - discount);
        } else if (name === 'discountPer') {
            const discountPercent = value; // define value as discountPercent
            const actualPrice = list[index]['actualPrice'];
            const discount = Math.round((discountPercent / 100) * actualPrice); // update discount based on discountPercent
            list[index]['netPrice'] = Math.round(actualPrice - discount);
            list[index]['discount'] = discount; // update discount value
        } else {
            // handle default case
            list[index]['discountPer'] = null;
            list[index]['netPrice'] = null;
            list[index]['discount'] = null;
        }

        setInputList(list);
        parentCallback(list)
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);

    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { productName: null, productCode: null, actualPrice: null, distributorPrice: null, marginPer: null, marginPrice: null, buyerPrice: null, sellerPrice: null, unitSize: null, qty: null, colorCode: null, discountPer: null, discount: null, netPrice: null }]);
        console.log("inputList", inputList)
    };
    //end block

    return (
        <Grid >
            <label>Update Price List</label>
            <div className="newproduct" style={{ background: '#c3e8bf', padding: '1rem' }}>

                <label>Add Price List</label>

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
                                    placeholder="ex: 1 to 2 Yrs"
                                    value={x.memory}
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
                                <label className="form-label">Actual Price<span className="text-danger">*</span></label>
                                <input
                                    className="form-control"
                                    name="actualPrice"
                                    placeholder="ex: 100"
                                    value={x.actualPrice}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Discount(%)*</label>
                                <input
                                    className="form-control"
                                    name="discountPer"
                                    placeholder="ex: 1"
                                    defaultValue={x.discountPer}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Discount Price*</label>
                                <input
                                    className="form-control"
                                    name="discount"
                                    placeholder="ex: 1"
                                    defaultValue={x.discount}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">NetPrice*</label>
                                <input
                                    className="form-control"
                                    name="netPrice"
                                    placeholder="ex: 1"
                                    defaultValue={x.netPrice}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </div>
                            <div className="col-md-3">
                                <div className="btn-box" style={{ marginTop: '2rem' }}>
                                    {inputList.length !== 1 && !x.readonly && <Button
                                        variant="contained"
                                        onClick={() => handleRemoveClick(i)} style={{ marginRight: '1rem' }}>Remove</Button>}
                                    {inputList.length - 1 === i && <Button variant="contained" onClick={handleAddClick}>Add</Button>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* <button className=" btn btn-success col-sm-3 mt-3 py-2" onClick={checkList}>CheckList</button> */}
        </Grid>
    )
}

export default Pricedetails