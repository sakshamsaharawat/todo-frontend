import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignUp.css';
import { useFormik } from 'formik';
import { signupValidation } from '../../validations/signup.validate';

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  console.log("showPassword", showPassword)
  console.log("setShowPassword", setShowPassword)
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidation,
    onSubmit: (values) => {
      console.log("User data:", values);
      alert("Login Successfully!");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='main-signup-component d-flex justify-content-center align-item-center'>
        <div className='sub-signup-component border-radius-10 b-ws p-5'>
          <div>
            <h1 className='black-color font-weight-6'> Sign up</h1>
            <input
              name='firstName'
              type='text'
              placeholder='Enter your first name'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className='signup-input mt-3 border-radius-5 p-2 b-ws'
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <span className='text-error'>{formik.errors.firstName}</span>
            )}
          </div>
          <div>
            <input
              name="lastName"
              type='text'
              placeholder='Enter your last name'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className='signup-input mt-3 border-radius-5 p-2 b-ws'
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <span className='text-error'>{formik.errors.lastName}</span>
            )}
          </div>
          <div>
            <input
              name="email"
              type='text'
              placeholder='Enter your email'
              value={formik.values.email}
              onChange={formik.handleChange}
              className='login-input mt-3 border-radius-5 p-2 b-ws'
            />
            {formik.touched.email && formik.errors.email && (
              <span className='text-error'>{formik.errors.email}</span>
            )}
          </div>
          <div className="position-relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="signup-input mt-3 border-radius-5 p-2 b-ws"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn-eye position-absolute cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <span className='text-error'>{formik.errors.password}</span>
            )}
          </div>
          <button className='signup-btn mt-4 border-radius-5 d-flex justify-content-center align-item-center'>
            Sign up
          </button>
        </div>
      </div>
    </form>
  )
}

export default SignUp;
