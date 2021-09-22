import React from "react";
import PropTypes from "prop-types";

export const Profession = ({ data }) => {
    return <td>{data.profession.name}</td>;
};

Profession.propTypes = {
    data: PropTypes.object
};
