import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import { CheckBoxField } from "../common/form/checkBoxField";
import { TextField } from "../common/form/textField";

export const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        console.log(target.name);
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "email is required"
            },
            isEmail: {
                message: "email doesnt match params"
            }
        },
        password: {
            isRequired: {
                message: "password is required"
            },
            isCapital: {
                message: "password should containt at least one capital char"
            },
            isContainsDigit: {
                message: "password should containt at least one digit"
            },
            min: {
                message: "should contain at least 8 symbols",
                value: 8
            }
        }
    };

    const validate = () => {
        const error = validator(data, validatorConfig);

        setErrors(error);

        return Object.keys(error).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="email"
                            label="Email address"
                            onChange={handleChange}
                            value={data.email}
                            error={errors.email}
                        />
                        <TextField
                            name="password"
                            type="password"
                            label="input your password"
                            onChange={handleChange}
                            value={data.password}
                            error={errors.password}
                        />
                        <CheckBoxField
                            value={data.stayOn}
                            onChange={handleChange}
                            name="stayOn"
                        >
                            Stay in system
                        </CheckBoxField>
                        <button
                            disabled={!isValid}
                            className="btn btn-primary w-100"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
