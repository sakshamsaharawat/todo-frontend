import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignUp.css';


const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setError] = useState<{ firstName?: string; lastName?: string; email?: string; password?: string }>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ''
  });

  const handleInputChange = (e: any): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleValidation = () => {
    const newErrors: { firstName?: string; lastName?: string; email?: string; password?: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Firstname is required.";
    } else if (formData.firstName.length < 3) {
      newErrors.firstName = "Enter a valid Firstname.";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Lastname is required.";
    } else if (formData.lastName.length < 3) {
      newErrors.lastName = "Enter a valid Lastname.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password cannot be empty or just spaces.";
    } else if (/\s/.test(formData.password.trim())) {
      newErrors.password = "Password cannot contain spaces.";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long.";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("user Data", formData)
      alert("Sign Up Successfully!")
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <div className='main-signup-component d-flex justify-content-center align-item-center'>
        <div className='sub-signup-component border-radius-10 b-ws p-5'>
          <div>
            <h1 className='black-color font-weight-6'> Sign up</h1>
            <input
              name='firstName'
              type='text'
              placeholder='Enter your first name'
              value={formData.firstName}
              onChange={handleInputChange}
              className='signup-input mt-3 border-radius-5 p-2 b-ws'
            />
            {errors.firstName && <p className='text-error border-error'>{errors.firstName}</p>}
          </div>
          <div>
            <input
              name="lastName"
              type='text'
              placeholder='Enter your last name'
              value={formData.lastName}
              onChange={handleInputChange}
              className='signup-input mt-3 border-radius-5 p-2 b-ws'
            />
            {errors.lastName && <p className='text-error border-error'>{errors.lastName}</p>}
          </div>
          <div>
            <input
              name="email"
              type='text'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleInputChange}
              className='login-input mt-3 border-radius-5 p-2 b-ws'
            />
            {errors.email && <p className='text-error border-error'>{errors.email}</p>}
          </div>
          <div className="position-relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
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
            {errors.password && <p className="text-error border-error">{errors.password}</p>}
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
