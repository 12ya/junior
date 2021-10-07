import React from "react";
import { Users } from "./components/users";
import { Route } from "react-router-dom";
import { Main } from "./routes/main";
import { Login } from "./routes/login";
import { Navbar } from "./routes/navbar";

export const App = () => {
    return (
        <>
            <Navbar />
            <Route path="/users:userId?" component={Users} />
            <Route path="/main" component={Main} />
            <Route path="/login" component={Login} />
        </>
    );
};
