import React, { useState } from 'react';
import studentsData from '../StudentInformations/StudentInformations.json';

const StudentsBioData = () => {
  const [studentId, setStudentId] = useState(1);

  let studentData = studentsData.find(
    (studentData) => studentData.id === studentId
  );

  console.log(
    '🚀 ~ file: StudentsBioData.js ~ line 16 ~ StudentsBioData ~ studentData',
    studentData
  );

  return (
    <section>
      <div
        className='border border-1  border-warning m-1 mb-0 
      p-3  b'
      >
        <div class='container-fluid card border border-1  border-warning'>
          <div className='row'>
            {studentsData.map((student) => (
              <div className='col-md-4 border-end border-bottom border-1 border-warning'>
                <div
                  onClick={() => setStudentId(student.id)}
                  style={{ cursor: 'pointer' }}
                  class='row g-0'
                >
                  <div class='col-md-8'>
                    <p class='card-text'>Students Name {student.studentName}</p>
                    <p>Enrollment No {student.enrollmentNo}</p>
                  </div>
                  <div class='col-md-4'>
                    <img
                      src={student.image}
                      class='img-fluid rounded-start'
                      alt='...'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='d-flex justify-content-between row'>
            <div className='d-flex justify-content-between col-md-5'>
              <div>
                Fees <hr />
              </div>

              <div>
                Events <hr />
              </div>
              <div>
                Diary <hr />
              </div>

              <div>
                Timetable <hr />
              </div>
              <div>
                Results <hr />
              </div>
            </div>
            <div className=' col-md-1'>
              <p>
                Profile <hr />
              </p>
            </div>
          </div>
        </div>
        <div className='border border-1  mt-4 col-md-7'>
          <div className='border-bottom p-3'>
            <span>Class: {studentData.class}</span>
            <br />
            <span>House: {studentData.house}</span>
            <br />
            <span>Date Of Birth: {studentData.dateOfBirth}</span>
          </div>

          <div>
            <div className='row'>
              <div className='col-md-7 border-end ps-4 py-3 d-flex'>
                <span>Address:</span>{' '}
                <span className='d-grid ms-3'>
                  <span>Lane 1 {studentData.line1}</span>
                  <span>Lane 2 {studentData.line2}</span>
                  <span>State {studentData.state}</span>
                  <span>City{studentData.city}</span>
                  <span>Pin {studentData.pin}</span>
                </span>
              </div>
              <div className='col-md-5 p-3'>
                <span>Blood Group: {studentData.bloodGroup}</span>
                <br />
                <span>Eyes: {studentData.eyes}</span>
                <br />
                <span>Ears: {studentData.ears}</span>
                <br />
                <span>Allergic To: {studentData.alergetic}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className='bg-warning m-1 mt-0 text-warning'
        style={{ height: '7vh' }}
      ></div>
    </section>
  );
};

export default StudentsBioData;
