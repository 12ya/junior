import React from "react";
import { TableBody } from "./tableBody";
import { TableHeader } from "./tableHeader";
import PropTypes from "prop-types";

export const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <table className="table">
            {children ? (
                children
            ) : (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};
