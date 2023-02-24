import axios from 'axios';
import React, { useState } from 'react'
import { getFormData } from '../util';

export default function TrancriptShare() {

    const handleSubmitShare = async (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        data = getFormData(data);
        const response = await axios.post("http://localhost:3001/api/transcript/share", data).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err);
        });
        console.log(response.data);
    }
    return (
        <div className='card mt-5'>
            <div className="card-header">
                <h1>Transcript Share</h1>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmitShare}>
                    <div className='form-group'>
                        <label className='font-bold'>Transcript ID:</label>
                        <input type="text" name='id' className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label className='font-bold'>Recipient ID:</label>
                        <input type="text" name='recipientId' className='form-control' />
                    </div>
                    <button type="submit" className="btn btn-outline-success mt-4">Share Transcript</button>
                </form>
            </div>

        </div>
    )
}
