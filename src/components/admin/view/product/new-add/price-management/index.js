import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
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
            // longDesc: '',
            // shortDesc: '',
            COD: '',
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
                COD: '',
                discountPer: '',
                discount: '',
                netPrice: '',
                longDesc: '',
                shortDesc: '',
                attribute: {},
            },
        ]);

        console.log('inputList', inputList)
    };

    return (
        <Grid container spacing={2}>
            <label>Price List</label>
            {inputList.map((x, i) => (
                <Grid item xs={12} key={i}>
                    <div className="row price_list_details" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '10px', alignItems: 'center' }}>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
                            <div className="col-md-3">
                                <TextField
                                    label="Product Name*"
                                    name="productName"
                                    placeholder="ex: Bultra"
                                    value={x.productName}
                                    onChange={(e) => handleInputChange(e, i)}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    label="Product Code*"
                                    name="productCode"
                                    placeholder="ex: FGSTW"
                                    value={x.productCode}
                                    onChange={(e) => handleInputChange(e, i)}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-2">
                                <TextField
                                    label="Quantity*"
                                    name="qty"
                                    placeholder="ex: 1"
                                    value={x.qty}
                                    onChange={(e) => handleInputChange(e, i)}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-2">
                                <TextField
                                    label="Actual Price*"
                                    name="actualPrice"
                                    placeholder="ex: 100"
                                    value={x.actualPrice}
                                    onChange={(e) => handleInputChange(e, i)}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-2">
                                <TextField
                                    label="Discount(%)"
                                    name="discountPer"
                                    placeholder="ex: 1"
                                    value={x.discountPer}
                                    onChange={(e) => handleInputChange(e, i)}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-2">
                                <TextField
                                    label="Discount Price*"
                                    name="discount"
                                    placeholder="ex: 1"
                                    value={x.discount}
                                    onChange={(e) => handleInputChange(e, i)}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-2">
                                <TextField
                                    label="Net Price*"
                                    name="netPrice"
                                    placeholder="ex: 1"
                                    value={x.netPrice}
                                    onChange={(e) => handleInputChange(e, i)}
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-2">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">COD*</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="COD"
                                        onChange={(e) => handleInputChange(e, i)}
                                        value={x.COD}
                                    >
                                        <MenuItem value="">Select type</MenuItem>
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', boxSizing: 'border-box', marginRight: '10px', width: '200px', marginBottom: '10px' }}>
                            {attributeList.map((value, key) => (
                                value.name !== undefined && (
                                    <div key={key} style={{ marginBottom: '10px', boxSizing: 'border-box' }}>
                                        <select
                                            name="attribute"
                                            value={x.attribute[value.name] || value.name} // Set default value to label name
                                            onChange={(e) => handleAttributeChange(e, i, value)}
                                            style={{
                                                backgroundColor: '#fff',
                                                color: '#000',
                                                padding: '8px 12px',
                                                fontSize: '16px',
                                                width: '100%',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                marginBottom: '10px'
                                            }}
                                        >
                                            <option value={value.name}>{value.name}</option> {/* Add default option with label name */}
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

                        <div className="col-md-3" style={{ marginTop: '2rem' }}>
                            <div className="btn-box" style={{ display: 'flex', alignItems: 'center' }}>
                                {inputList.length !== 1 && (
                                    <Button variant="contained" onClick={() => handleRemoveClick(i)} style={{ marginRight: '1rem' }}>
                                        Remove
                                    </Button>
                                )}
                                {inputList.length - 1 === i && <Button variant="contained" onClick={handleAddClick}>Add</Button>}
                            </div>
                        </div>
                    </div>
                </Grid>
            ))}
        </Grid>

    );
};

export default Pricecolormanagement;
