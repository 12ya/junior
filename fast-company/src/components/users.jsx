import React, { PureComponent, useState } from 'react';
import api from '../api';

export const Users = () => {
    const [data, setData] = useState(api.users.fetchAll());
    console.log(data);
    return (
        <>
            <table class='table'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quality</th>
                        <th scope='col'>Proffession</th>
                        <th scope='col'>times met</th>
                        <th scope='col'>rating</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => {
                        console.log(data.indexOf(d), 'index');
                        return (
                            <>
                                <tr key={d.id}>
                                    <th scope='row'>{i + 1}</th>
                                    <td key>{d.name}</td>
                                    {d.qualities.map((q) => (
                                        <td
                                            className={`badge bg-${q.color} m-1`}
                                        >
                                            {q.name}
                                        </td>
                                    ))}
                                    <td>{d.profession.name}</td>
                                    <td>{d.completedMeetings}</td>
                                    <td>{d.rate}</td>
                                    <button
                                        onClick={() => {
                                            let i = data.indexOf(d);
                                            console.log(i, 'ifsd');
                                            console.log(data[i], 'fjdsifj');
                                            setData(
                                                data.filter(
                                                    (d) => d._id != data[i]._id
                                                )
                                            );
                                        }}
                                        type='button'
                                        class='btn btn-danger p-0'
                                    >
                                        <span class='badge bg-danger p-2'>
                                            Delete
                                        </span>
                                    </button>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
