import React from 'react';

export const Qualities = ({ d }) => {
    return (
        <td>
            {d.qualities.map((q) => (
                <p className={`badge bg-${q.color} m-1`}>{q.name}</p>
            ))}
        </td>
    );
};
