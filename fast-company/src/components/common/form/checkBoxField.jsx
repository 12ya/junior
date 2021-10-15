import React from "react";
import PropTypes from "prop-types";

export const CheckBoxField = ({ value, onChange, name, children, error }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    const renderInputClasses = () => {
        return "form-check-label" + (error ? " is-invalid" : "");
    };

    return (
        <div className="form-check mb-4">
            <input
                className="form-check-input"
                type="checkbox"
                value={value}
                id="flexCheckDefault"
                onChange={handleChange}
                checked={value}
            />
            <label className={renderInputClasses()} htmlFor="flexCheckDefault">
                {children}
            </label>

            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};
