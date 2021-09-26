import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { User } from "./user";
import { Pagination } from "./pagination";
import { GroupList } from "./groupList";
import { pagination } from "../utils/paginate";
import api from "../api";

export const Users = ({ data, setData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const pageSize = 2;
    const filteredUsers = selectedProf
        ? data.filter((user) => {
              console.log(user, "useefefesf");
              console.log(selectedProf, "selectedprof");
              return typeof user.profession === "object"
                  ? user.profession.name === selectedProf.name
                  : user.profession === selectedProf;
          })
        : data;

    const length = filteredUsers && filteredUsers.length;

    const users = pagination(filteredUsers, currentPage, pageSize);

    useEffect(() => {
        api.professions.fetchAll().then((prof) => setProfessions(prof));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const deleteItem = (i) => {
        setData(data.filter((d) => d._id !== data[i]._id));
    };

    const onPageChange = (page) => {
        console.log("pagenumber", page);
        setCurrentPage(page);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf("");
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button
                        className="btn btn-secondary mt-2 ml-2"
                        onClick={clearFilter}
                    >
                        clear
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        length={length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    data: PropTypes.array,
    setData: PropTypes.func
};
