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
        email: 'harvindersb@gmail.com',
        phone_number: '9899999999',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  // const [studentsProfile, setStudentsProfile] = useState();
  // console.log(
  //   '🚀 ~ file: StudentsBioData.js ~ line 82 ~ StudentsBioData ~ studentsProfile',
  //   studentsProfile
  // );

  // useEffect(() => {
  //   fetch('http://13.126.35.191:9182/sms/pp/user/student/profile')
  //     .then((res) => res.json())
  //     .then((data) => setStudentsProfile(data));
  // }, []);

  return (
    <section>
      <div
        className='border border-1  border-warning m-1 mb-0 
      p-3 b'
      >
        <div class='container-fluid card border border-1  border-warning'>
          <div className='row'>
            {studentsData.map((student) => (
              <button className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12 border-end border-bottom border-1 border-warning btn'>
                <div
                  onClick={() => setStudentId(student.id)}
                  style={{ cursor: 'pointer' }}
                  class='row g-0'
                >
                  <div class='col-md-7 p-2 '>
                    <div className='mt-4'>
                      <div class='card-text d-flex'>
                        <p className='col-md-7 col-6'>Students Name </p>
                        <p className='border-bottom border-3 border-dark col-md-5 col-6 text-center'>
                          {student.studentName}
                        </p>
                      </div>
                      <div class='card-text d-flex'>
                        <p className='col-md-7 col-6'>Enrollment No </p>
                        <p className='border-bottom border-3 border-dark col-md-5 text-center col-6 '>
                          {student.enrollmentNo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class='col-md-5 p-3'>
                    <img src={student.image} class='img-fluid' alt='...' />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className='row'>
            <div className='col-xxl-10 col-xl-10 col-lg-10  col-md-12 col-sm-12 col-xs-12'>
              <button
                onClick={(e) => setInfo(e.target.value)}
                value='Fees'
                className='my-2 me-2 me-xxl-5 me-xl-5 me-lg-5 me-md-4 me-sm-2 me-xs-2 btn border-bottom border-2 pe-5'
              >
                Fees
              </button>
              <button className='my-2 me-2 me-xxl-5 me-xl-5 me-lg-5 me-md-4 me-sm-2 me-xs-2 btn border-bottom border-2 pe-5'>
                Events
              </button>
              <button className='my-2 me-2 me-xxl-5 me-xl-5 me-lg-5 me-md-4 me-sm-2 me-xs-2 btn border-bottom border-2 pe-5'>
                Diary
              </button>
              <button className='my-2 me-2 me-xxl-5 me-xl-5 me-lg-5 me-md-4 me-sm-2 me-xs-2 btn border-bottom border-2 pe-5'>
                Timetable
              </button>
              <button className='my-2 me-2 me-xxl-5 me-xl-5 me-lg-5 me-md-4 me-sm-2 me-xs-2 btn border-bottom border-2 pe-5'>
                Results
              </button>
            </div>
            <div className='col-md-2 text-md-end text-start'>
              <button
                onClick={(e) => setInfo(e.target.value)}
                value='Profile'
                className='my-2 btn border-bottom border-2 pe-5'
              >
                Profile
              </button>
            </div>
          </div>
        </div>

        {info === profiles ? (
          <div className='container border my-5'>
            <div className='row'>
              <div className='col-md-12 border p-4'>
                <span>
                  <span className='fw-bold'>Class :</span> {studentData.class}
                </span>
                <br />
                <span>
                  <span className='fw-bold'>House :</span> {studentData.house}
                </span>
                <br />
                <span>
                  <span className='fw-bold'>Date Of Birth :</span>{' '}
                  {studentData.dateOfBirth}
                </span>
              </div>
              <div className='col-md-6  border p-4'>
                {' '}
                <span className='fw-bold'>Address:</span>{' '}
                <span className='d-grid ms-3'>
                  <span>Lane 1 {studentData.line1}</span>
                  <span>Lane 2 {studentData.line2}</span>
                  <span>State {studentData.state}</span>
                  <span>City{studentData.city}</span>
                  <span>Pin {studentData.pin}</span>
                </span>
              </div>
              <div className='col-md-6 border p-4'>
                <span>
                  {' '}
                  <span className='fw-bold'>Blood Group :</span>{' '}
                  {studentData.bloodGroup}
                </span>
                <br />
                <span>
                  <span className='fw-bold'>Eyes :</span> {studentData.eyes}
                </span>
                <br />
                <span>
                  <span className='fw-bold'>Ears :</span> {studentData.ears}
                </span>
                <br />
                <span>
                  {' '}
                  <span className='fw-bold'>Allergic To :</span>{' '}
                  {studentData.alergetic}
                </span>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        {info === fee ? (
          <div className='row mt-5 pt-3'>
            <div className='col-xxl-9 col-xl-9 col-lg-8 col-md-12 col-sm-12 col-xs-12'>
              <table class='table table-hover border'>
                <thead>
                  <tr>
                    <th className='pb-3' scope='col'>
                      Month
                    </th>
                    <th className='pb-3' scope='col'>
                      Due Amount
                    </th>
                    <th className='pb-3' scope='col'>
                      Amount Paid
                    </th>
                    <th className='pb-3' scope='col'>
                      Balance
                    </th>
                    <th className='pb-3' scope='col'>
                      View
                    </th>
                    <th className='pb-3' scope='col'>
                      Status
                    </th>
                    <th className='pb-3' scope='col'>
                      print
                    </th>
                    <th scope='col'>
                      {' '}
                      <span
                        onClick={displayRazorpay}
                        style={{
                          backgroundColor: '#ffc107',
                        }}
                        className='btn btn-outline-warning text-dark fw-bold col-12'
                      >
                        Pay All
                      </span>
                    </th>
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
                        style={{
                          backgroundColor: '#ffda6a',
                        }}
                        onClick={displayRazorpay}
                        className='btn  col-12'
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
                      <span
                        style={{
                          backgroundColor: '#ffda6a',
                        }}
                        className='btn btn-warning   col-12'
                      >
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
                      <span
                        style={{
                          backgroundColor: '#ffda6a',
                        }}
                        className='btn btn-warning   col-12'
                      >
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
                      <span
                        style={{
                          backgroundColor: '#ffda6a',
                        }}
                        className='btn btn-warning   col-12'
                      >
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
                      <span
                        style={{
                          backgroundColor: '#ffda6a',
                        }}
                        className='btn btn-warning   col-12'
                      >
                        Pay
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-12 col-sm-12 col-xs-12'>
              {details.length > 0 ? (
                <div>
                  <div class='card'>
                    <div class='card-header text-center'>Mar</div>
                    <ul class='list-group list-group-flush'>
                      <spam class='list-group-item d-flex justify-content-between'>
                        <span>Tuition Free</span>
                        <span>8000</span>
                      </spam>
                      <span class='list-group-item d-flex justify-content-between'>
                        <span>Computer Fee</span>
                        <span>1200</span>
                      </span>
                      <span class='list-group-item d-flex justify-content-between '>
                        <span>Lab Fee</span>
                        <span>2300</span>
                      </span>
                      <span class='list-group-item d-flex justify-content-between '>
                        <span></span>
                        <span>8500</span>
                      </span>
                      <span class='list-group-item d-flex justify-content-between'>
                        <span>Sibling Discount</span>
                        <span>500</span>
                      </span>
                      <span class='list-group-item d-flex justify-content-between fw-bold'>
                        <span>Net Fee</span>
                        <span>8000</span>
                      </span>

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
