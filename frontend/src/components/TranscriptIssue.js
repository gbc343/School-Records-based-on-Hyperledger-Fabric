import axios from 'axios';
import React, { useState } from 'react'
import { getFormData } from '../util';

export default function TranscriptIssue() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        data = getFormData(data);
        await axios.post("http://localhost:3001/api/transcript/issue", data).then(res => {
            console.log(res)
        }).catch(err => {

        });
    }
    return (
        <div className='card mt-5'>
            <div className="card-header">
                <h1>Transcript Issue</h1>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label className="font-bold">Transcript ID:</label>
                        <input type="text" name='id' className="form-control" />
                    </div>
                    <div className='form-group'>
                        <label className="font-bold">Student ID:</label>
                        <input type="text" name='studentId' className="form-control" />
                    </div>
                    <div className='form-group'>
                        <label className="font-bold">Grades:</label>
                        <input type="text" name='grades' className="form-control" />
                    </div>
                    <div className='form-group'>
                        <label className="font-bold">Issuer:</label>
                        <input type="text" name='issuer' className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-outline-success mt-4">Issue Transcript</button>
                </form>
            </div>
        </div>
    )
}
