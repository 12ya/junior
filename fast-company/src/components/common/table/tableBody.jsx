import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

export const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) =>
                        columns[column].path === "name" ? (
                            <Link to={`/users/${item._id}`}>
                                <td key={column}>
                                    {renderContent(item, column)}
                                </td>
                            </Link>
                        ) : (
                            <td key={column}>{renderContent(item, column)}</td>
                        )
                    )}
                </tr>
            ))}
        </tbody>
    );
};
