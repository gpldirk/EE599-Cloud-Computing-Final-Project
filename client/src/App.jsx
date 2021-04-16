import React from 'react';
import { Link } from 'react-router-dom';
import { signout } from './helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth } from './helpers/auth';
import { Fragment } from 'react';
import InputBox from './screens/InputBox';

function App({ history }) {
  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-8/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-2xl font-extrabold  text-center '>
              TinyURL - Full Stack & Highly Scalable URL Shortening Service{' '}
            </h1>
            { !isAuth() ? <InputBox /> : null}
            <div className='w-full flex-1 mt-32 text-indigo-500'>
                <div className='mx-auto max-w-xs relative '>

                { !isAuth() ? <Fragment>
                  <Link
                    to='/login'
                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  >
                    <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                    <span className='ml-3'>Sign In</span>
                  </Link>
                  <Link
                    to='/register'
                    className='mt-5 tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  >
                    <i className='fas fa-user-plus  w-6  -ml-2' />
                    <span className='ml-3'>Sign Up</span>
                  </Link>
                </Fragment> : <Fragment>
                    <Link
                      to='/profile'
                      className='mt-5 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                    >
                      <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                      <span className='ml-3'>Profile</span>
                    </Link>

                    <Link
                      to='/subscription'
                      className='mt-5 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                    >
                      <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                      <span className='ml-3'>Subscription</span>
                    </Link>

                    <Link
                      to='/urls'
                      className='mt-5 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                    >
                      <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                      <span className='ml-3'>URLs</span>
                    </Link>

                    <button
                      onClick={() => {
                        signout(() => {
                          toast.success('Sign Out Successfully');
                          history.push('/');
                        });
                      }}
                      className='mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                    >
                      <i className='fas fa-sign-out-alt  w-6  -ml-2' />
                      <span className='ml-3'>Signout</span>
                    </button>
                  </Fragment> }
 
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
