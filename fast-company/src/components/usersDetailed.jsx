import React, { useEffect, useState } from "react";
import api from "../api";
import { SelectField } from "./common/form/selectField";
import { useHistory } from "react-router-dom";
import moment from "moment";

export const UsersDetailed = ({ userId }) => {
    const [data, setData] = useState({});
    const [name, setName] = useState("");
    const [comments, setComments] = useState([]);
    const [profession, setProfession] = useState();
    const [completed, setCompleted] = useState();
    const [rate, setRate] = useState();
    const [qualities, setQualities] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [commentData, setCommentData] = useState();
    const [message, setMessage] = useState("");
    const history = useHistory();

    useEffect(() => {
        console.log("useridinyouknow", { userId });

        api.users
            .getById(userId)
            .then((d) => {
                console.log(d, "datainuserdetailed");
                setName(d.name);
                setProfession(d.profession);
                setCompleted(d.completedMeetings);
                setRate(d.rate);
                setQualities(d.qualities);
            })
            .catch((e) => console.log(e, "error inuseEffect"));
    }, [userId]);

    const fetchComments = () => {
        api.comments.fetchCommentsForUser(userId).then((c) => {
            console.log(c, "comments");
            setComments(c);
        });
    };

    useEffect(() => {
        console.log(commentData, "commentData---------");
    }, [commentData]);

    useEffect(() => {
        fetchComments();
        api.users.fetchAll().then((data) => {
            setUsersList(data);
            console.log(data, "professionsinregisterForm");
        });
    }, []);

    const handleChange = (target) => {
        console.log(target.name);
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const addComment = () => {
        api.comments
            .add({
                pageId: userId,
                content: message,
                userId: commentData
            })
            .then((res) => console.log(res, "comment added"))
            .catch((err) => console.log(err, "err in comment"));
    };

    const sortedComments = comments.sort((a, b) => a.created_at < b.created_at);

    return (
        <>
            {data && (
                <div class="container">
                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <button class="position-absolute top-0 end-0 btn btn-light btn-sm">
                                        <i
                                            class="bi bi-gear"
                                            onClick={() =>
                                                history.push(
                                                    `/users/${userId}/edit`
                                                )
                                            }
                                        ></i>
                                    </button>
                                    <div class="d-flex flex-column align-items-center text-center position-relative">
                                        <img
                                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                                Math.random() + 1
                                            )
                                                .toString(36)
                                                .substring(7)}.svg`}
                                            className="rounded-circle shadow-1-strong me-3"
                                            alt="avatar"
                                            width="65"
                                            height="65"
                                        />
                                        <div class="mt-3">
                                            <h4>{name}</h4>
                                            <p class="text-secondary mb-1">
                                                {profession?.name}
                                            </p>
                                            <div class="text-muted">
                                                <i
                                                    class="bi bi-caret-down-fill text-primary"
                                                    role="button"
                                                ></i>
                                                <i
                                                    class="bi bi-caret-up text-secondary"
                                                    role="button"
                                                ></i>
                                                <span class="ms-2">{rate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-3">
                                <div class="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 class="card-title">
                                        <span>Qualities</span>
                                    </h5>
                                    <p class="card-text">
                                        {qualities.map((q) => (
                                            <div
                                                key={q._id}
                                                className={`badge bg-${q.color} m-1`}
                                            >
                                                {q.label
                                                    ? q.label
                                                    : q.name
                                                    ? q.name
                                                    : null}
                                            </div>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            <div class="card mb-3">
                                <div class="card-body d-flex flex-column justify-content-center text-center">
                                    <h6 class="card-title">
                                        <span>Completed meeting</span>
                                    </h6>
                                    <h1>{completed}</h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card mb-2">
                                <div class="card-body ">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="validationCustom04"
                                            className="form-label"
                                        >
                                            {"select user"}
                                        </label>
                                        <select
                                            className={"form-select"}
                                            id="validationCustom04"
                                            value={commentData}
                                            onChange={(e) =>
                                                setCommentData(e.target.value)
                                            }
                                        >
                                            <option
                                                selected={commentData === ""}
                                                disabled
                                                value=""
                                            >
                                                {"select"}
                                            </option>
                                            {usersList?.map((option) => (
                                                <option
                                                    key={option._id}
                                                    selected={
                                                        option.name ===
                                                        commentData
                                                    }
                                                    value={option._id}
                                                >
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <h5>message</h5>
                                    <textarea
                                        title="some"
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        value={message}
                                    />
                                    <button
                                        onClick={() => {
                                            addComment();
                                            fetchComments();
                                            setMessage('')
                                        }}
                                        style={{ alignSelf: "flex-end" }}
                                        className="btn btn-primary"
                                    >
                                        add
                                    </button>
                                </div>
                            </div>
                            <div class="card mb-3">
                                <div class="card-body ">
                                    <h2>Comments</h2>
                                    <hr />
                                </div>
                                {sortedComments.map((comment) => {
                                    return (
                                        <CommentSection
                                            data={comment}
                                            update={fetchComments}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

function CommentSection({ data, update }) {
    const [name, setName] = useState();
    const [date, setDate] = useState("");

    useEffect(() => {
        console.log(data, "userid");
        api.users.getById(data.userId).then((user) => {
            if (user) {
                setName(user.name);
            }
        });
        setDate(moment(data.created_at).fromNow());
        console.log(moment(data.created_at).toDate(), "dfjidfjdisi");
    }, [data]);

    return (
        <>
            <div class="bg-light card-body  mb-3" key={data._id}>
                <div class="row">
                    <div class="col">
                        <div class="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div class="flex-grow-1 flex-shrink-1">
                                <div class="mb-4">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="mb-1 ">
                                            {name}
                                            {date && (
                                                <span class="small">
                                                    / {date}
                                                </span>
                                            )}
                                        </p>
                                        <button class="btn btn-sm text-primary d-flex align-items-center">
                                            <i
                                                class="bi bi-x-lg"
                                                onClick={() => {
                                                    api.comments.remove(
                                                        data._id
                                                    );
                                                    update();
                                                }}
                                            ></i>
                                        </button>
                                    </div>
                                    <p class="small mb-0">{data.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
