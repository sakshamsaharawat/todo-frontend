import React, { useState } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setError] = useState<{ email?: String; password?: string }>({})

    const handleValidation = () => {
        const newErrors: { email?: string; password?: string } = {};
        const emailValue = email.trim();
        const passwordValue = password.trim();

        if (!emailValue) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
            newErrors.email = "Enter a valid email address.";
        } else if (email !== emailValue) {
            newErrors.email = "Email cannot have leading or trailing spaces.";
        }

        if (!passwordValue) {
            newErrors.password = "Password cannot be empty or just spaces.";
        } else if (/\s/.test(passwordValue)) {
            newErrors.password = "Password cannot contain spaces.";
        } else if (passwordValue.length < 4) {
            newErrors.password = "Password must be at least 4 characters long.";
        } else if (password !== passwordValue) {
            newErrors.password = "Password cannot have leading or trailing spaces.";
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        if (handleValidation()) {
            alert("Login Successfully!")
        }
    };

    return (
        <form onSubmit={handleSumbit}>
            <div className='login-main-component p-3' style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div className='login-image-text border-radius-10'>
                    <h1 className='login-text position-absolute'>Orgainc  <br />Mind</h1>
                    <div className='d-flex justify-content-center align-item-center position-relative'>
                        <img src='homeImage.png' />
                    </div>
                </div>
                <div className='login-content-component d-flex justify-content-center align-item-center border-radius-10 b-ws'>
                    <div className='login-sub-content'>
                        <div>
                            <h1 className='black-color font-weight-6'> Sign in</h1>
                            <input
                                type='text'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='login-input mt-3 border-radius-5 p-2 b-ws'
                            />
                            {errors.email && <p className='text-error border-error'>{errors.email}</p>}
                        </div>
                        <div className="position-relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input mt-3 border-radius-5 p-2 b-ws"
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

                        <button className='login-btn mt-4 border-radius-5 d-flex justify-content-center align-item-center'>
                            Sign in
                        </button>
                        <p className='mt-4 d-flex justify-content-center align-item-center font-size'>
                            Dont't have an account? <a href='/signup'>Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </form >
    )
}

export default Login;
