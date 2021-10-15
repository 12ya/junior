import React, { useState } from "react";
import { LoginForm } from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import { RegisterForm } from "../components/ui/registerForm";

export const Login = () => {
    const { type } = useParams();

    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = () => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    {formType === "register" ? (
                        <>
                            <RegisterForm />
                            <p>
                                already have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    signIn
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <LoginForm />
                            <p>
                                dont have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    singUp
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
