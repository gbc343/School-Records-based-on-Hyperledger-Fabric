import React, { useState, useEffect } from "react";
import axios from "axios";

function Transcript() {
  const [id, setId] = useState("");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
  }, []);
  const handleSubmitGet = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target);
    await axios.get(`http://localhost:3001/api/transcript/${data.get('id')}`).then(res => {

    }).catch(err => {
      console.log(err)
    });


  }
  return (
    <div className="card mt-3">
      <div className="card-header">

        <h1>Transcript Manager</h1>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmitGet}>
          <div className='form-group'>
            <label className="font-bold">Transcript ID:</label>
            <input type="text" name="id" className="form-control" />
          </div>
          <button type="submit" className="btn btn-outline-success mt-4">Get Transcript</button>
        </form>
        <div className="mt-4">
          <h2>Transcript:</h2>
          {transcript && (
            <div>
              <p>ID: {transcript.id}</p>
              <p>Student ID: {transcript.studentID}</p>
              <p>Grades: {transcript.grades}</p>
              <p>Issuer: {transcript.issuer}</p>
              {/* <p>Timestamp: {transcript.timestamp}</p> */}
              <p>Verified: {transcript.verified ? 'Yes' : 'No'}</p>
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default Transcript;


