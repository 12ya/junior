import React, { useState, useEffect } from "react";

export const SearchBar = ({ setText, text }) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
        console.log(text, "textinput");
    }, [text]);

    return (
        <input
            onChange={(e) => {
                setText(e.target.value);
            }}
            value={text}
            placeholder = 'search users'
        />
    );
};
