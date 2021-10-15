import React from "react";
import PropTypes from "prop-types";

export const QualitiesList = ({ qualities }) => {
    console.log(qualities, "qqwqqq");
    return (
        <>
            {qualities.map((q) => (
                <p key={q.name} className={`badge bg-${q.color} m-1`}>
                    {q.name}
                </p>
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
