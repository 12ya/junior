import React from "react";
import PropTypes from "prop-types";

export const Qualities = ({ data }) => {
    return (
        <td>
            {data.qualities.map((q) => (
                <p key={q.name} className={`badge bg-${q.color} m-1`}>
                    {q.name}
                </p>
            ))}
        </td>
    );
};

Qualities.propTypes = {
    data: PropTypes.object
};
