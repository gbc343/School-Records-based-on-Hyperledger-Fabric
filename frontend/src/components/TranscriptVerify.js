import axios from 'axios';
import React, { useState } from 'react'
import { getFormData } from '../util';

export default function TranscriptVerify() {
    const handleSubmitVerify = async (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        data = getFormData(data);

        await axios.post("http://localhost:3001/api/transcript/verify", data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });

    }
    return (
        <div className='card mt-5'>
            <div className="card-header">
                <h1>Transcript Verify</h1>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmitVerify}>
                    <div className='form-group'>
                        <label className='font-bold'>Transcript ID:</label>
                        <input type="text" name='id' className='form-control' />
                    </div>
                    <button type="submit" className="btn btn-outline-success mt-4">Verify Transcript</button>
                </form>
            </div>
        </div>
    )
}
