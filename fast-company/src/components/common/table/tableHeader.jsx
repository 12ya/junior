import React, { useState } from "react";
import PropTypes from "prop-types";

export const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [up, setUp] = useState(false);
    const [arrow, setArrow] = useState(false);

    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
            setUp(selectedSort.order === "asc" ? true : false);
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const renderArrow = (selectedSort, currentPath) => {
        if (selectedSort.path === currentPath) {
            if (selectedSort.order === "asc") {
                return <i className="bi bi-caret-down-fill"></i>;
            } else {
                return <i className="bi bi-caret-up-fill"></i>;
            }
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        onClick={
                            columns[column].path
                                ? () => {
                                      handleSort(columns[column].path);
                                      setArrow(true);
                                  }
                                : undefined
                        }
                        key={column}
                        scope="col"
                        role={columns[column].path && "button"}
                    >
                        {columns[column].name}
                        {renderArrow(selectedSort, columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
