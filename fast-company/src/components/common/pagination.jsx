import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export const Pagination = ({ length, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(length / pageSize);

    const pages = _.range(1, pageCount + 1);
    console.log({ currentPage });

    if (pageCount === 1) return null;

    return (
        <nav style={{ flexDirection: "row" }}>
            <ul className="pagination">
                {pages.map((p) => (
                    <li
                        className={
                            "page-item " + (p === currentPage ? "active" : "")
                        }
                        key={p}
                    >
                        <a
                            className="page-link"
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    length: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};
