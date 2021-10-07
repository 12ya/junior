import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { User } from "./user";
import { Pagination } from "./pagination";
import { GroupList } from "./groupList";
import { pagination } from "../utils/paginate";
import api from "../api";
import { UsersTable } from "./usersTable";
import _ from "lodash";
import { useParams } from "react-router-dom";

export const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [order, setOrder] = useState({ path: "name", order: "asc" });
    const [data, setData] = useState();
    const [userData, setUserData] = useState();

    const params = useParams();

    const { userId } = params;

    useEffect(() => {
        api.users.default.fetchAll().then((d) => setData(d));
    }, []);

    useEffect(() => {
        console.log("useridinyouknow");

        api.users.default.getById(userId).then((d) => {
            console.log(d, "datainuserdetailed");
            setUserData(d);
        });
    }, [userId]);

    const pageSize = 5;

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

    const sortedUsers = _.orderBy(filteredUsers, [order.path], [order.order]);

    const users = pagination(sortedUsers, currentPage, pageSize);

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

    const handleSort = (item) => {
        setOrder(item);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf("");
    };

    if (!data) {
        return "...Loading";
    }

    if (userId) {
        return (
            <div>
                USERID: {userId}
                {userData}
            </div>
        );
    }

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
                <UsersTable
                    users={users}
                    setData={setData}
                    deleteItem={deleteItem}
                    onSort={handleSort}
                    selectedSort={order}
                />
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
