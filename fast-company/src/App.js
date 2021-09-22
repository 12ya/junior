import React, { useState } from "react";
import { Users } from "./components/users";

import api from "./api";
export const App = () => {
    const [data, setData] = useState(api.users.fetchAll());

    console.log(data);

    return <Users data={data} setData={setData} />;
};
