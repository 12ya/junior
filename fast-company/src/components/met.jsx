import React from "react";
import PropTypes from "prop-types";

export const Met = ({ data }) => {
    return <td>{data.completedMeetings}</td>;
};

Met.propTypes = {
    data: PropTypes.object
};
