import React from 'react';

const Complaint = (props) => (
    <div>
        <h2>{props.rollNo}</h2>
        <h3>{props.complaint}</h3>
    </div>
);

export default Complaint;