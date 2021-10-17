import React, { useState, useEffect } from "react";

import { TextField } from "./common/form/textField";
import api from "../api";
import { SelectField } from "./common/form/selectField";
import { RadioField } from "./common/form/radioField";
import { MultiSelect } from "./common/form/multiSelectField";
import { CheckBoxField } from "./common/form/checkBoxField";
import { useParams } from "react-router-dom";

import { useHistory } from "react-router-dom";

export const EditUser = () => {
    const params = useParams();
    const history = useHistory();

    const { userId } = params;

    console.log(params, "paramsinedituser");

    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
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
        if (userId) {
            api.users.getById(userId).then((userData) => {
                console.log(userData, "datainedituser");
                // Object.keys(userData).map((d) => {
                //     console.log(d, "userdata", userData[d]);
                //     setData((prev) => ({ ...prev, d: userData[d] }));
                // });
                setData((prev) => ({ ...prev, name: userData.name }));
                if (userData.email) {
                    setData((prev) => ({ ...prev, email: userData.email }));
                }

                setData((prev) => ({
                    ...prev,
                    profession: userData.profession?._id
                }));
                setData((prev) => ({
                    ...prev,
                    qualities: userData.qualities.map((q) => q.label)
                }));
                // setData((prev) => ({
                //     ...prev,
                //     qualities: userData.qualities
                // }));
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data);

        api.users.update(userId, data);
        history.goBack();
    };

    return (
        <div className="container mt-5">
            <button
                onClick={() => history.goBack()}
                className="btn btn-primary"
            >
                <i class="bi bi-arrow-left"></i> back
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Edit User</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="name"
                            type="name"
                            label="change your name"
                            onChange={handleChange}
                            value={data.name}
                        />
                        <TextField
                            name="email"
                            label="Email address"
                            onChange={handleChange}
                            value={data.email}
                        />
                        <SelectField
                            label={"Choose your profession"}
                            onChange={handleChange}
                            options={professions}
                            defaultOption="Choose.."
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
                            value={data.qualities}
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            onClick={handleSubmit}
                            // onClick={() => history.push(`/users/`)}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
