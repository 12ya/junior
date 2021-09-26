import React, { useState, useEffect } from "react";
import { Users } from "./components/users";

import api from "./api";
export const App = () => {
    const [data, setData] = useState();

    useEffect(() => {
        api.users.default.fetchAll().then((d) => setData(d));
    }, []);

    console.log(data);

    return <Users data={data} setData={setData} />;
};
