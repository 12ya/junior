import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Users } from "./users";

import { UsersDetailed } from "./usersDetailed";

export const UsersTab = () => {
    const params = useParams();

    const { userId } = params;

    return userId ? <UsersDetailed userId={userId} /> : <Users />;
};
