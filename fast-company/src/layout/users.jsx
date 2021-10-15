import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Pagination } from "../components/common/pagination";
import { GroupList } from "../components/common/groupList";
import { pagination } from "../utils/paginate";
import api from "../api";
import { UsersTable } from "../components/ui/usersTable";
import _ from "lodash";
import { SearchBar } from "../components/searchbar";

export const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [text, setText] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [order, setOrder] = useState({ path: "name", order: "asc" });
    const [data, setData] = useState();

    useEffect(() => {
        api.users.fetchAll().then((d) => setData(d));
    }, []);

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

    const searchedU =
        text.length > 0
            ? sortedUsers.filter(
                  (su) => su.name.toLowerCase().indexOf(text) != -1
              )
            : sortedUsers;

    const users = pagination(searchedU, currentPage, pageSize);

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
                <SearchBar text={text} setText={setText} />
                <UsersTable
                    users={searchedUsers.length > 0 ? searchedUsers : users}
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
