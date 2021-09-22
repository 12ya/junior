import React from "react";
import PropTypes from "prop-types";

import { Bookmark } from "./bookmark";
import { Profession } from "./profession";
import { Qualities } from "./qualities";
import { Met } from "./met";

export const User = ({ data, i, deleteItem }) => {
    console.log(data, "data in user");
    return (
        <tr key={data.id}>
            <th scope="row">{i + 1}</th>
            <td key={data.id}>{data.name}</td>
            <Qualities data={data} />
            <Profession data={data} />
            <Met data={data} />
            <Bookmark />
            <td>{data.rate}</td>
            <td>
                <button
                    onClick={() => deleteItem(i)}
                    type="button"
                    className="btn btn-danger p-0"
                >
                    <span className="badge bg-danger p-2">Delete</span>
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    data: PropTypes.object,
    i: PropTypes.number,
    deleteItem: PropTypes.func
};
