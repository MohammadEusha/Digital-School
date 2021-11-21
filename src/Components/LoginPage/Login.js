import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import invalid from '../../Images/invalid.png';
import valid from '../../Images/valid.png';
import firebaseConfig from './firebase.config';
import {
  createUserWithEmailAndPassword,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from './LoginForm';
const Login = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/bioData' } };

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
  });
  initializeLoginFramework();

  // const googleSignIn = () => {
  //   handleGoogleSignIn().then((res) => {
  //     handleResponse(res, true);
  //   });
  // };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };
  // let display;
  // if (document.getElementById('passwordError').innerHTML) {
  //   display = <p>awd</p>;
  // }

  const handleBlur = (e) => {
    let isFieldValid = true;

    // let display;
    // if (document.getElementById('passwordError').innerHTML) {
    //   display = '<FontAwesomeIcon icon={faExclamationTriangle} />';
    // }
    if (e.target.name === 'email') {
      isFieldValid =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          e.target.value
        );
      // var disPlayPassword = '';
      // document.getElementById('emailError').innerHTML = disPlayPassword;
    } else {
      // var disPlayEmail = 'Invalid Email Structure!!!';
      // document.getElementById('emailError').innerHTML = disPlayEmail;
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber_CapitalLetter_SpecialCharacter =
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,255}$/.test(
          e.target.value
        );
      isFieldValid =
        isPasswordValid && passwordHasNumber_CapitalLetter_SpecialCharacter;

      // var disPlayPassword = '';
      // document.getElementById('passwordError').innerHTML = disPlayPassword;
    } else {
      // var disPlayPassword = 'Invalid Password Structure!!!';
      // document.getElementById('passwordError').innerHTML = disPlayPassword;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  // let display;
  // if (document.getElementById('passwordError').innerHTML) {
  //   display = <p>awd</p>;
  // }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  const validateEmail = () => {
    var form = document.getElementById('form');
    var email = document.getElementById('email').value;
    var text = document.getElementById('emailError');
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.match(pattern)) {
      form.classList.add('valid');
      form.classList.remove('invalid');
      text.innerHTML =
        'Your Email Address Is Valid   ' +
        ` <img src=${valid} width="15px" height="15px" padding="20px">`;
      text.style.color = 'green';
      text.style.textAlign = 'center';
    } else {
      form.classList.remove('valid');
      form.classList.add('invalid');
      text.innerHTML =
        'Please Enter Valid Email Address  ' +
        ` <img src=${invalid} width="15px" height="15px" padding="20px">`;
      text.style.color = 'red';
      text.style.textAlign = 'center';
    }

    if (email === '') {
      form.classList.remove('valid');
      form.classList.remove('invalid');
      text.innerHTML = '';
    }
  };

  const validatePassword = () => {
    var form = document.getElementById('form');
    var password = document.getElementById('password').value;
    var text = document.getElementById('passwordError');
    var pattern =
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,255}$/;
    if (password.match(pattern)) {
      form.classList.add('valid');
      form.classList.remove('invalid');
      text.innerHTML =
        'Your Password Is Valid ' +
        ` <img src=${valid} width="15px" height="15px" padding="20px">`;
      text.style.color = 'green';
      text.style.textAlign = 'center';
    } else {
      form.classList.remove('valid');
      form.classList.add('invalid');
      text.innerHTML =
        'Please Enter Valid Password ' +
        ` <img src=${invalid} width="15px" height="15px" padding="20px">`;
      text.style.color = 'red';
      text.style.textAlign = 'center';
    }
    if (password === '') {
      form.classList.remove('valid');
      form.classList.remove('invalid');
      text.innerHTML = '';
    }
  };

  return (
    <section>
      <div className='border border-1  border-warning m-1 mb-0 b '>
        <div className='container Middler'>
          <div className='row  '>
            <div className='col-md-6'>
              <h1>
                <span className='text-primary'>Cool</span>
                <span className='text-warning'>EdSys</span>
              </h1>
              <p className='text-secondary'>
                The Most Advanced School Management System
              </p>
            </div>

            <div className='col-md-6'>
              <form id='form' onSubmit={handleSubmit}>
                {/* <div className='input-group '> */}

                {newUser && (
                  <input
                    className='rounded-pill form-control form-control-lg py-3 my-1 border border-3 border-warning'
                    name='name'
                    type='text'
                    onBlur={handleBlur}
                    placeholder='Your name'
                  />
                )}
                {/* </div> */}
                {/* <div className='input-group'> */}
                {/* <label for=''>
                    <h4>Email</h4>
                  </label> */}
                <input
                  id='email'
                  className='rounded-pill form-control form-control-lg py-3 my-1 border border-3 border-warning'
                  placeholder='Email'
                  name='email'
                  type='email'
                  onChange={validateEmail}
                  onBlur={handleBlur}
                  required
                />
                <div id='emailError' className='text-end pe-4'></div>

                {/* </div> */}
                {/* <div className='input-group'> */}
                {/* <label for=''>
                    <h4>Password</h4>
                  </label> */}
                <input
                  name='password'
                  type='password'
                  id='password'
                  className='rounded-pill form-control form-control-lg py-3 my-1 border border-3 border-warning'
                  placeholder='Password'
                  onChange={validatePassword}
                  onBlur={handleBlur}
                  required
                />
                <p id='passwordError' className='text-end pe-4'></p>

                {/* </div> */}
                {/* <div className='d-flex justify-content-end'>
                  <h4
                    style={{ cursor: 'pointer' }}
                    className='my-3 text-primary'
                  >
                    Forget Password
                  </h4>
                </div> */}

                {/* <div className='d-grid'>
                  <input
                    className='rounded-pill btn  btn-lg px-5 text-light'
                    type='submit'
                    style={{ backgroundColor: '#e9520e' }}
                    value={newUser ? ' Sign Up' : 'Sign In'}
                  />
                </div> */}

                <div className='text-center d-grid mt-4'>
                  <button
                    className='rounded-pill btn  btn-lg px-5 text-light'
                    type='submit'
                    style={{ backgroundColor: '#e9520e' }}
                  >
                    <FontAwesomeIcon icon={faLock} className='me-2' />
                    {newUser ? ' Sign Up' : 'Sign In'}
                  </button>
                </div>
                <div>
                  <div className='text-end'>
                    {newUser ? (
                      <p className='pt-2'>
                        Have An Account?{' '}
                        <a
                          style={{ color: '#e9520e' }}
                          onClick={() => setNewUser(!newUser)}
                          href='#'
                        >
                          Sign In
                        </a>
                      </p>
                    ) : (
                      <p className='pt-2'>
                        Don't Have An Account?{' '}
                        <a
                          style={{ color: '#e9520e' }}
                          onClick={() => setNewUser(!newUser)}
                          href='#'
                        >
                          Sign Up
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {user.success && (
              <p style={{ color: 'green' }}>
                User {newUser ? 'created' : 'Logged In'} successfully
              </p>
            )}
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

export default Login;
