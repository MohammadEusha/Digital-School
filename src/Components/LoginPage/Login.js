import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
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
    <section className='container pt-5'>
      <div className='row '>
        <div className='col-md-6'>
          <h1>
            <span>Cool</span>
            <span>EdSys</span>
          </h1>
          <p>The Most Advanced School Management System</p>
        </div>

        <div className='col-md-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name='email'
              type='email'
              className='rounded-pill form-control form-control-lg'
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />

            <div className='pt-1'>
              {errors.email?.type === 'required' && (
                <span className='text-danger'>
                  {' '}
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Email is
                  required
                </span>
              )}
              {errors.email?.type === 'pattern' ? (
                <span className='text-danger'>
                  {' '}
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Invalid Email
                  Structure
                </span>
              ) : (
                ''
              )}
              {/* {errors.email?.type !== 'required' &&
                errors.email?.type !== 'pattern' ? (
                  <span className='text-success'>
                    {' '}
                    <i class='fas fa-check-circle pr-2'></i>Valid Email
                    Structure
                  </span>
                ) : (
                  ''
                )} */}
            </div>

            <input
              name='password'
              className='rounded-pill form-control form-control-lg'
              type='password'
              autoComplete='off'
              {...register('password', {
                required: true,
                pattern:
                  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,255}$/,
              })}
            />

            <div className='pt-1'>
              {errors.password?.type === 'required' && (
                <span className='text-danger'>
                  {' '}
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Password
                  Field is required
                </span>
              )}
              {errors.password?.type === 'pattern' ? (
                // <span className='text-danger'>
                //   {' '}
                //   <i class='fas fa-exclamation-triangle pr-2'></i> Password
                //   must contain at least 6 characters, at least one number and
                //   both lower and uppercase letters and special characters
                // </span>
                <span className='text-danger'>
                  {' '}
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  Invalid Password Structure.
                </span>
              ) : (
                ''
              )}
            </div>

            <div className='text-center'>
              <button className='my-4' color='primary' type='submit'>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
