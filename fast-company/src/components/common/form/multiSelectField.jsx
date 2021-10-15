import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

export const MultiSelect = ({ options, onChange, name, label, value }) => {
    let optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((option) => ({
                  label: options[option].name,
                  value: options[option]._id
              }))
            : options;
    const handleChange = (value) => {
        console.log(value, "einmultiselectfield");
        onChange({ name: name, value });
    };
    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <Select
                value={value}
                closeMenuOnSelect={false}
                isMulti
                options={optionsArray}
                name="select"
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};

MultiSelect.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string
};
