import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignUp.css';
import { useFormik } from 'formik';
import { signupValidation } from '../../validations/signup.validate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../State/Auth/Action';
import { RootState } from '../../store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { toast } from 'react-toastify';



const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { authReducer } = useSelector((store: RootState) => store)
  console.log("user", authReducer)
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      console.log("Values", values);
      try {
        const result = await dispatch(register(values));
        if (result.success) {
          toast.success("User register successfully.")
          navigate("/todo/upcoming")
        } else {
          console.log("Registration failed:", result.message)
          toast.error(result.message || "Registration failed. Please try again.")
        }
      } catch (error) {
        console.error("Unexpected error during registration:", error);
        toast.error('An unexpected error occurred. Please try again later.')
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='main-signup-component d-flex justify-content-center align-item-center'>
        <div className='sub-signup-component border-radius-10 b-ws p-5'>
          <div>
            <h1 className='black-color font-weight-6'> Sign up</h1>
            <input
              name='first_name'
              type='text'
              placeholder='Enter your first name'
              value={formik.values.first_name}
              onChange={formik.handleChange}
              className='signup-input mt-3 border-radius-5 p-2 b-ws'
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <span className='text-error'>{formik.errors.first_name}</span>
            )}
          </div>
          <div>
            <input
              name="last_name"
              type='text'
              placeholder='Enter your last name'
              value={formik.values.last_name}
              onChange={formik.handleChange}
              className='signup-input mt-3 border-radius-5 p-2 b-ws'
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <span className='text-error'>{formik.errors.last_name}</span>
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
          <button
            type="submit"
            className='submit-btn width-full mt-4 border-radius-5'>
            Sign up
          </button>
          <p className='mt-4 d-flex justify-content-center align-item-center font-size'>
            Already have an account ? <a href='/login'>Sign in</a>
          </p>
        </div>
      </div>
    </form>
  )
}

export default SignUp;
