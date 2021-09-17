import React, { useState } from 'react';
import api from '../api';
import { Bookmark } from './bookmark';
import { Profession } from './profession';
import { Qualities } from './qualities';
import { Met } from './met';
export const Users = ({ data, setData }) => {
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
                        <th scope='col'>bookmark</th>
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
                                    <Qualities d={d} />
                                    <Profession d={d} />
                                    <Met d={d} />
                                    <Bookmark />
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
