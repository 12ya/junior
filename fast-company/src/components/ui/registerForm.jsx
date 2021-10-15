import React, { useState, useEffect } from "react";

import { validator } from "../../utils/validator";
import { TextField } from "../common/form/textField";
import api from "../../api";
import { SelectField } from "../common/form/selectField";
import { RadioField } from "../common/form/radioField";
import { MultiSelect } from "../common/form/multiSelectField";
import { CheckBoxField } from "../common/form/checkBoxField";

export const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});

    const handleChange = (target) => {
        console.log(target.name);
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
            console.log(data, "professionsinregisterForm");
        });
        api.qualities.fetchAll().then((data) => {
            setQualities(data);
            console.log(data, "qualitiesinregisterForm");
        });
    }, []);

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
        },
        profession: {
            isRequired: {
                message: "profession if required"
            }
        },
        licence: {
            isRequired: {
                message: "you gotta agree on our terms"
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
                    <h3 className="mb-4">Register</h3>
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
                        <SelectField
                            label={"Choose your profession"}
                            onChange={handleChange}
                            options={professions}
                            defaultOption="Choose.."
                            error={errors.profession}
                            value={data.profession}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" }
                            ]}
                            value={data.sex}
                            name={"sex"}
                            onChange={handleChange}
                            label={"choose your sex"}
                        />
                        <MultiSelect
                            options={qualities}
                            onChange={handleChange}
                            name={"qualities"}
                            label={"choose your qualities"}
                        />
                        <CheckBoxField
                            value={data.licence}
                            onChange={handleChange}
                            name="licence"
                            error={errors.licence}
                        >
                            licence agreement <a>terms</a>
                        </CheckBoxField>
                        <button
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
