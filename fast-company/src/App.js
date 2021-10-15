import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./layout/main";
import { Login } from "./layout/login";
import { Navbar } from "./components/ui/navbar";
import { UsersTab } from "./components/usersTab";
import { EditUser } from "./components/editUser";

export const App = () => {
    return (
        <>
            <Navbar />
            <Route path="/users/:userId?" component={UsersTab} />
            <Route path="/users/:userId/edit" component={EditUser} />
            <Route path="/main" component={Main} />
            <Route path="/login/:type?" component={Login} />
        </>
    );
};
