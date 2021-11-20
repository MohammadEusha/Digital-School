import {
  faExclamationTriangle,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <section>
      <div className='border border-1  border-warning m-1 mb-0 b  '>
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  name='email'
                  type='email'
                  className='rounded-pill form-control form-control-lg py-3 my-1 border border-3 border-warning'
                  placeholder='Email'
                  {...register('email', {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />

                <div className='pt-1'>
                  {errors.email?.type === 'required' && (
                    <h5 className='text-danger'>
                      {' '}
                      <FontAwesomeIcon icon={faExclamationTriangle} /> Email is
                      required
                    </h5>
                  )}
                  {errors.email?.type === 'pattern' ? (
                    <h5 className='text-danger'>
                      {' '}
                      <FontAwesomeIcon icon={faExclamationTriangle} /> Invalid
                      Email Structure
                    </h5>
                  ) : (
                    ''
                  )}
                </div>

                <input
                  name='password'
                  type='password'
                  className='rounded-pill form-control form-control-lg py-3 my-1 border border-3 border-warning'
                  placeholder='Password'
                  autoComplete='off'
                  {...register('password', {
                    required: true,
                    pattern:
                      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,255}$/,
                  })}
                />

                <div className='pt-1'>
                  {errors.password?.type === 'required' && (
                    <h5 className='text-danger'>
                      {' '}
                      <FontAwesomeIcon icon={faExclamationTriangle} /> Password
                      Field is required
                    </h5>
                  )}
                  {errors.password?.type === 'pattern' ? (
                    <h5 className='text-danger'>
                      {' '}
                      <FontAwesomeIcon icon={faExclamationTriangle} /> Invalid
                      Password Structure.
                    </h5>
                  ) : (
                    ''
                  )}
                </div>
                <div className='d-flex justify-content-end'>
                  <h4 className='my-3 text-primary'>Forget Password</h4>
                </div>

                <div className='text-center '>
                  <button
                    className='rounded-pill btn  btn-lg px-5 text-light'
                    type='submit'
                    style={{ backgroundColor: '#e9520e' }}
                  >
                    <FontAwesomeIcon icon={faLock} className='me-2' />
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className='bg-warning m-1 mt-0 text-warning'
        style={{ height: '50px' }}
      ></div>
    </section>
  );
};

export default Login;
