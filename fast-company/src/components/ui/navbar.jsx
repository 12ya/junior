import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "20%"
            }}
        >
            <div>
                <Link to="/main">main</Link>
            </div>
            <div>
                <Link to="/login">login</Link>
            </div>
            <div>
                <Link to="/users">users</Link>
            </div>
        </div>
    );
};
