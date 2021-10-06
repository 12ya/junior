import React from "react";
// import { User } from "./user";
import PropTypes from "prop-types";
import { TableHeader } from "./tableHeader";
import { TableBody } from "./tableBody";
import { Bookmark } from "./bookmark";
import { QualitiesList } from "./qualitiesList";
import { Table } from "./table";

export const UsersTable = ({
    users,
    setData,
    deleteItem,
    selectedSort,
    onSort
}) => {
    const columns = {
        number: { path: "number", name: "#" },
        name: { path: "name", name: "Name" },
        qualities: {
            name: "Qualities",
            component: (user) => <QualitiesList qualities={user} />
        },
        professions: { path: "profession.name", name: "Profession" },
        completedMeetings: { path: "completedMeetings", name: "times met" },
        bookmark: {
            path: "bookmark",
            name: "bookmark",
            component: <Bookmark />
        },
        rate: { path: "rate", name: "rating" },
        delete: {
            component: (user) => (
                <button
                    onClick={() => deleteItem(user._id)}
                    type="button"
                    className="btn btn-danger p-0"
                >
                    <span className="badge bg-danger p-2">Delete</span>
                </button>
            )
        }
    };
    return (
        <Table {...{ onSort, selectedSort, columns, data: users }}>
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired
};
