import React, { useState } from 'react';
import studentsData from '../StudentInformations/StudentInformations.json';
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === 'localhost';

const StudentsBioData = () => {
  const [studentId, setStudentId] = useState(1);

  let studentData = studentsData.find(
    (studentData) => studentData.id === studentId
  );

  var profiles = 'Profile';

  var fee = 'Fees';

  const [info, setInfo] = useState([]);
  const [details, setDetails] = useState([]);

  const [name, setName] = useState('Mehul');

  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const data = await fetch('http://localhost:1337/razorpay', {
      method: 'POST',
    }).then((t) => t.json());

    console.log('Getting Data info', data);
    console.log('Testing id', data.id);

    const options = {
      key: __DEV__ ? 'rzp_test_VyHtTatQ09TDsY' : 'PRODUCTION_KEY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'School Fees',
      description: 'Thank you for paying',
      image: 'http://localhost:1337/logo.svg',
      handler: function (response) {
        alert(
          response.razorpay_payment_id +
            response.razorpay_order_id +
            response.razorpay_signature
        );
        // alert(response.razorpay_order_id)
        // alert(response.razorpay_signature)
      },
      prefill: {
        name,
        email: 'sdfdsjfh2@ndsfdf.com',
        phone_number: '9899999999',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <section>
      <div
        className='border border-1  border-warning m-1 mb-0 
      p-3 b'
      >
        <div class='container-fluid card border border-1  border-warning'>
          <div className='row'>
            {studentsData.map((student) => (
              <div className='col-md-4 border-end border-bottom border-1 border-warning '>
                <div
                  onClick={() => setStudentId(student.id)}
                  style={{ cursor: 'pointer' }}
                  class='row g-0 '
                >
                  <div class='col-md-7 p-2'>
                    <div class='card-text d-flex'>
                      <p className='col-md-5'>Students Name </p>
                      <p className='border-bottom border-3 border-dark col-md-7 text-center'>
                        {student.studentName}
                      </p>
                    </div>
                    <div class='card-text d-flex'>
                      <p className='col-md-5'>Enrollment No </p>
                      <p className='border-bottom border-3 border-dark col-md-7 text-center'>
                        {student.enrollmentNo}
                      </p>
                    </div>
                  </div>
                  <div class='col-md-5 p-3'>
                    <img src={student.image} class='img-fluid' alt='...' />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='d-flex justify-content-between row mb-3'>
            <div className='d-flex justify-content-between col-md-7'>
              <div>
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => setInfo(e.target.value)}
                  value='Fees'
                  className='border-bottom border-3 btn pe-5 '
                >
                  Fees
                </button>
              </div>

              <div>
                <button className='border-bottom border-3 pe-5 btn'>
                  {' '}
                  Events{' '}
                </button>
              </div>
              <div>
                <button className='border-bottom border-3 pe-5 btn'>
                  {' '}
                  Diary{' '}
                </button>
              </div>

              <div>
                <button className='border-bottom border-3 pe-5 btn'>
                  {' '}
                  Timetable{' '}
                </button>
              </div>
              <div>
                <button className='border-bottom border-3 pe-5 btn'>
                  {' '}
                  Results{' '}
                </button>
              </div>
            </div>
            <div className=' col-md-2'>
              <button
                onClick={(e) => setInfo(e.target.value)}
                value='Profile'
                className='border-bottom border-3 pe-5 btn '
              >
                {' '}
                Profile{' '}
              </button>
            </div>
          </div>
        </div>

        {info === profiles ? (
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
        ) : (
          ''
        )}

        {info === fee ? (
          <div className='row'>
            <div className='col-md-8'>
              <table class='table '>
                <thead>
                  <tr>
                    <th scope='col'>Month</th>
                    <th scope='col'>Due Amount</th>
                    <th scope='col'>Amount Paid</th>
                    <th scope='col'>Balance</th>
                    <th scope='col'>View</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>print</th>
                    <th scope='col'>Pay</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>May</td>
                    <td>8000</td>
                    <td>0</td>
                    <td>8000</td>
                    <td>
                      <button
                        onClick={(e) => setDetails(e.target.value)}
                        value='Details'
                        className='link-primary btn '
                      >
                        Details
                      </button>
                    </td>
                    <td>OverDue</td>
                    <td>-</td>
                    <td>
                      <span
                        onClick={displayRazorpay}
                        className='btn btn-warning bg-warning  col-12'
                      >
                        Pay
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Apr</td>
                    <td>8000</td>
                    <td>0</td>
                    <td>8000</td>
                    <td>
                      <button
                        onClick={(e) => setDetails(e.target.value)}
                        value='Details'
                        className='link-primary btn '
                      >
                        Details
                      </button>
                    </td>
                    <td>OverDue</td>
                    <td>-</td>
                    <td>
                      <span className='btn btn-warning bg-warning  col-12'>
                        Pay
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Mar</td>
                    <td>8000</td>
                    <td>8000</td>
                    <td>0</td>
                    <td>
                      <button
                        onClick={(e) => setDetails(e.target.value)}
                        value='Details'
                        className='link-primary btn '
                      >
                        Details
                      </button>
                    </td>
                    <td></td>
                    <td>-</td>
                    <td>
                      <span className='btn btn-warning bg-warning  col-12'>
                        Pay
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Feb</td>
                    <td>8000</td>
                    <td>8000</td>
                    <td>0</td>
                    <td>
                      <button
                        onClick={(e) => setDetails(e.target.value)}
                        value='Details'
                        className='link-primary btn '
                      >
                        Details
                      </button>
                    </td>
                    <td></td>
                    <td>-</td>
                    <td>
                      <span className='btn btn-warning bg-warning  col-12'>
                        Pay
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Jan</td>
                    <td>8000</td>
                    <td>8000</td>
                    <td>0</td>
                    <td>
                      <button
                        onClick={(e) => setDetails(e.target.value)}
                        value='Details'
                        className='link-primary btn '
                      >
                        Details
                      </button>
                    </td>
                    <td></td>
                    <td>-</td>
                    <td>
                      <span className='btn btn-warning bg-warning  col-12'>
                        Pay
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-md-4 pt-3'>
              {details.length > 0 ? (
                <div>
                  <div class='card'>
                    <div class='card-header text-center'>Mar</div>
                    <ul class='list-group list-group-flush'>
                      <div class='list-group-item d-flex justify-content-between border-0'>
                        <p>Tuition Free</p>
                        <p>8000</p>
                      </div>
                      <div class='list-group-item d-flex justify-content-between border-0'>
                        <p>Computer Fee</p>
                        <p>1200</p>
                      </div>
                      <div class='list-group-item d-flex justify-content-between '>
                        <p>Lab Fee</p>
                        <p>2300</p>
                      </div>
                      <div class='list-group-item d-flex justify-content-between '>
                        <p></p>
                        <p>8500</p>
                      </div>
                      <div class='list-group-item d-flex justify-content-between'>
                        <p>Sibling Discount</p>
                        <p>500</p>
                      </div>
                      <div class='list-group-item d-flex justify-content-between fw-bold'>
                        <p>Net Fee</p>
                        <p>8000</p>
                      </div>

                      <div
                        style={{
                          backgroundColor: '#f9cb9c',
                        }}
                        class='list-group-item d-flex justify-content-between'
                      >
                        <p>
                          Payment Dtls <br />{' '}
                          <span className='ps-5'>5-Apr-2021</span>
                        </p>
                        <p>8000</p>
                      </div>
                      <div class='card-footer d-flex justify-content-between'>
                        <p>Outstanding</p>
                        <p>NIl</p>
                      </div>
                    </ul>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>

      <div
        className='bg-warning m-1 mt-0 text-warning'
        style={{ height: '7vh' }}
      ></div>
    </section>
  );
};

export default StudentsBioData;
