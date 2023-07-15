import React, { useState } from 'react';
import XLSX from 'xlsx';
import './upload.css';
import { GetProductDetails } from '../../../../services'; // Update import path based on your project structure

const UploadProdxl = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResult, setUploadResult] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name);
    };

    const convertToSlug = (text) => {
        return text
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    };

    const convertExcelToJson = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

                    // Ensure the worksheet exists
                    if (!worksheet) {
                        reject(new Error('Invalid worksheet data.'));
                        return;
                    }

                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    // Ensure the jsonData has the necessary structure
                    if (!Array.isArray(jsonData) || jsonData.length === 0) {
                        reject(new Error('Invalid JSON data.'));
                        return;
                    }

                    const headerRow = jsonData[0];
                    const rows = jsonData.slice(1);

                    const products = {};

                    rows.forEach((row) => {
                        if (headerRow.length === 0 || row.length === 0) {
                            return;
                        }

                        const productType = row[headerRow.indexOf('productType')];

                        if (productType === 'variant') {
                            const parentId = row[headerRow.indexOf('parentId')];

                            if (!parentId || !products[parentId]) {
                                reject(new Error(`Invalid parent ID ${parentId} for variant.`));
                                return;
                            }

                            const variant = {
                                productName: row[headerRow.indexOf('productName')],
                                slug: convertToSlug(row[headerRow.indexOf('productName')]),
                                productCode: row[headerRow.indexOf('productCode')],
                                actualPrice: row[headerRow.indexOf('Actual price(mrp)')],
                                distributorPrice: row[headerRow.indexOf('distributorPrice')],
                                marginPer: row[headerRow.indexOf('marginPer')],
                                marginPrice: row[headerRow.indexOf('marginPrice')],
                                memory: row[headerRow.indexOf('Size(according to age)')],
                                interface: row[headerRow.indexOf('Material')],
                                buyerPrice: row[headerRow.indexOf('buyerPrice')],
                                sellerPrice: row[headerRow.indexOf('sellerPrice')],
                                unitSize: row[headerRow.indexOf('unitSize')],
                                qty: row[headerRow.indexOf('Stock')],
                                color: row[headerRow.indexOf('Color')],
                                discountPer: row[headerRow.indexOf('Discount percentage')],
                                discount: row[headerRow.indexOf('Discount price')] || (row[headerRow.indexOf('Actual price(mrp)')] - row[headerRow.indexOf('NetPrice(after dis.)')]),
                                netPrice: row[headerRow.indexOf('NetPrice(after dis.)')],
                                total: row[headerRow.indexOf('total')],
                                qtyWarning: row[headerRow.indexOf('Low Stock Amount(QTYWARNING)')],
                                youTubeUrl: row[headerRow.indexOf('YouTubeURL(videoLink of product)')],
                                COD: row[headerRow.indexOf('COD')],
                                brandId: row[headerRow.indexOf('Featured Product')],
                                refundable: row[headerRow.indexOf('Refundable?')],
                                longDesc: row[headerRow.indexOf('longDesc')],
                                shortDesc: row[headerRow.indexOf('shortDesc')],
                                stockType: row[headerRow.indexOf('stockType')],
                                Available: row[headerRow.indexOf('In stock?')],
                            };

                            products[parentId].productVariants.push(variant);
                        } else if (productType === 'main') {
                            const productId = row[headerRow.indexOf('id')];

                            const product = {
                                id: productId,
                                categoryName: row[headerRow.indexOf('categoryName')],
                                subCategoryName: row[headerRow.indexOf('subCategoryName')],
                                name: row[headerRow.indexOf('productName')],
                                slug: convertToSlug(row[headerRow.indexOf('productName')]),
                                brandId: row[headerRow.indexOf('Featured Product')],
                                status: row[headerRow.indexOf('status')],
                                desc: row[headerRow.indexOf('desc')],
                                photo: row[headerRow.indexOf('photo')],
                                productVariants: [],
                                HighLightDetail: [],
                                ShippingDays: row[headerRow.indexOf('ShippingDays')],
                                PubilshStatus: row[headerRow.indexOf('PublishedStatus')],
                            };

                            products[productId] = product;
                        }
                    });

                    const finalProducts = Object.values(products);
                    console.log(finalProducts);

                    resolve(JSON.stringify(finalProducts, null, 2));
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        });
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (selectedFile) {
            try {
                const jsonData = await convertExcelToJson(selectedFile);
                const response = await GetProductDetails.uploadProductList(jsonData);
                console.log(response);
                setUploadResult([response.data]);
                setSelectedFile(null);
                setSelectedFileName('');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <div className="upload-container">
                <h3 className="upload-title">Products Excel file upload here</h3>
                <div className="upload-form">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="file-upload" className="upload-button">
                            Choose File
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            className="upload-input"
                            accept=".xlsx,.xls"
                            multiple={false}
                        />
                        <button type="submit" className="upload-button">
                            Upload
                        </button>
                    </form>
                    {selectedFileName && (
                        <p className="selected-file-name">Selected File: {selectedFileName}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadProdxl;
