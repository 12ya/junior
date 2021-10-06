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

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        className={
                            columns[column].path && arrow && up
                                ? "bi bi-caret-down-fill"
                                : columns[column].path && arrow && !up
                                ? "bi bi-caret-up-fill"
                                : null
                        }
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
