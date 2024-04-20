import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import ReactQuill from 'react-quill'; // Import ReactQuill

const HighLightList = ({ callback, state, desc, longDesc }) => {
    const [inputList, setInputList] = useState(state.length > 0 ? state.map(item => ({ ...item, readonly: true })) : [{ title: null }]);

    // Handler to update desc
    const handleDescChange = (content) => {
        callback({ desc: content, longDesc }); // Update desc only
    };

    // Handler to update longDesc
    const handleLongDescChange = (content) => {
        callback({ desc, longDesc: content }); // Update longDesc only
    };

    return (
        <React.Fragment>
            {inputList.map((x, i) => {
                return (
                    <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                        <Grid item xs={12}>
                            <div style={{ background: i % 2 ? 'rgb(195 232 191 / 25%)' : '#DAF7A6', padding: '25px', borderRadius: '8px' }}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        {/* Use ReactQuill for desc */}
                                        <label className='form-label'>Description*</label>
                                        <ReactQuill
                                            value={desc}
                                            onChange={handleDescChange}
                                            placeholder="Write something..."
                                            style={{ height: '200px', marginBottom: '20px' }} // Increase height here
                                        />
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        {/* Use ReactQuill for longDesc */}
                                        <label className='form-label'>Long Description*</label>
                                        <ReactQuill
                                            value={longDesc}
                                            onChange={handleLongDescChange}
                                            placeholder="Write something..."
                                            style={{ height: '200px' }} // Increase height here
                                        />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                );
            })}
        </React.Fragment>
    )
}

export default HighLightList;
