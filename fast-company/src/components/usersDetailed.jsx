import React, { useEffect, useState } from "react";
import api from "../api";

import { useHistory } from "react-router-dom";

export const UsersDetailed = ({ userId }) => {
    const [data, setData] = useState();
    const history = useHistory();

    useEffect(() => {
        console.log("useridinyouknow", { userId });

        api.users
            .getById(userId)
            .then((d) => {
                console.log(d, "datainuserdetailed");
                setData(d);
            })
            .catch((e) => console.log(e, "error inuseEffect"));
    }, [userId]);

    return (
        <>
            {data && (
                <div style={{ marginLeft: 20 }}>
                    <div style={{ fontSize: 40, fontWeight: "bold" }}>
                        {data.name}
                    </div>
                    <div style={{ fontSize: 30, fontWeight: "normal" }}>
                        Profession: {data.profession?.name}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: "normal" }}>
                        Qualities:{" "}
                        {data.qualities.map((q) => (
                            <div
                                className={`badge bg-${q.color} m-1`}
                                key={q._id}
                            >
                                {q.label ? q.label : q.name}
                            </div>
                        ))}
                    </div>
                    <div>Completed meetings : {data.completedMeetings}</div>
                    <div style={{ fontSize: 30, fontWeight: "bold" }}>
                        rate: {data.rate}
                    </div>
                    <button
                        onClick={() => history.push(`/users/${userId}/edit`)}
                    >
                        edit user
                    </button>
                </div>
            )}
        </>
    );
};
