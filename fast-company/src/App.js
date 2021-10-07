import React from "react";
import { Users } from "./components/users";
import { Route } from "react-router-dom";
import { Main } from "./routes/main";
import { Login } from "./routes/login";
import { Navbar } from "./routes/navbar";
import { UsersTab } from "./components/usersTab";

export const App = () => {
    return (
        <>
            <Navbar />
            <Route path="/users/:userId?" component={UsersTab} />
            <Route path="/main" component={Main} />
            <Route path="/login" component={Login} />
        </>
    );
};
