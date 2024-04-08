import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import RichTextEditor from '../../../../../RichTextEditor';
import { GetAttribute } from '../../../../../services';

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
            attribute: {},
        },
    ]);

    const [attributeList, setAttributeList] = useState([])
    useEffect(() => {
        async function fetchAttributeList() {
            const AttributeList = await GetAttribute.getAllAttribute();
            setAttributeList(AttributeList.data);
        }
        fetchAttributeList();
    }, []);

    console.log("attributeList", attributeList)

    const handleAttributeChange = (e, index, attribute) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index]['attribute'][attribute.name] = value;
        setInputList(list);

        console.log("List***change", list)
    };

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
        // Handle the case when the discount is changed, and adjust discountPer accordingly
        if (name === 'discount') {
            if (value !== '' && list[index]['actualPrice'] !== '') {
                list[index]['discountPer'] = (value / list[index]['actualPrice']) * 100;
                list[index]['netPrice'] = (list[index]['actualPrice'] - value);
            } else {
                list[index]['discountPer'] = '';
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
            if (value !== '' && discount !== '') {
                list[index]['discountPer'] = (discount / value) * 100;
                list[index]['discountPer'] = (discount / value) * 100;
            } else {
                list[index]['discountPer'] = '';
            }
        }

        setInputList(list);
        parentCallback(list);
        console.log(list, "callback Data")
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
                attribute: {},
            },
        ]);
    };

    return (
        <Grid>
            <label>Price List</label>
            {inputList.map((x, i) => {
                return (
                    <div className="row price_list_details" key={i} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '100%', boxSizing: 'border-box' }}>
                            {attributeList.map((value, key) => (
                                value.name !== undefined && (
                                    <div key={key} style={{ marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}>
                                        <label className="form-label font-weight-bold">{value.name}*</label>
                                        <select
                                            name="attribute"
                                            value={x.attribute[value.name] || ''}
                                            onChange={(e) => handleAttributeChange(e, i, value)}
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
                                            {/* <option value="">{value.name}</option> */}
                                            {value.AttributeValues.map((val, index) => (
                                                <option key={index} value={val.value}>
                                                    {val.value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )
                            ))}
                        </div>

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
        </Grid >
    );
};

export default Pricecolormanagement;
