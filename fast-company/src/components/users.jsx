import React, { useState } from "react";
import PropTypes from "prop-types";

import { User } from "./user";
import { Pagination } from "./pagination";
import { pagination } from "../utils/paginate";

export const Users = ({ data, setData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const deleteItem = (i) => {
        setData(data.filter((d) => d._id !== data[i]._id));
    };

    const length = data.length;
    const pageSize = 4;

    const onPageChange = (page) => {
        console.log("pagenumber", page);
        setCurrentPage(page);
    };
    const users = pagination(data, currentPage, pageSize);

    return (
        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quality</th>
                        <th scope="col">Proffession</th>
                        <th scope="col">times met</th>
                        <th scope="col">bookmark</th>
                        <th scope="col">rating</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((d, i) => (
                        <User
                            key={d._id}
                            data={d}
                            setData={setData}
                            i={i}
                            deleteItem={deleteItem}
                        />
                    ))}
                </tbody>
            </table>
            <Pagination
                length={length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </React.Fragment>
    );
};

Users.propTypes = {
    data: PropTypes.array,
    setData: PropTypes.func
};
