import React from 'react';
import "./setting.css";

const Setting: React.FC = () => {
    return (
        <div className='p-5'>
            <div className='profile-title pl-4'>
                <h3>Profile</h3>
                <p>Add Or Edit Your Profile Details</p>
            </div>

            <div className='profile-container mt-5 d-flex b-ws'>
                <div>
                    <h4>First Name</h4>
                    <input
                        className='profile-input'
                    />
                </div>
                <div>
                    <h4>Last Name</h4>
                    <input
                        className='profile-input'
                    />
                </div>
                <div>
                    <h4>Phone Number</h4>
                    <input
                        className='profile-input'
                    />
                </div>
                <div>
                    <h4>Gender</h4>
                    <input
                        className='profile-input'
                    />
                </div>
                <div>
                    <h4>Country</h4>
                    <input
                        className='profile-input'
                    />
                </div>
                <div>
                    <h4>City</h4>
                    <input
                        className='profile-input'
                    />
                </div>
                <div>
                    <h4>Dob</h4>
                    <input
                        type='date'
                        className='profile-input'
                    />
                </div>
            </div>
        </div>
    )
}

export default Setting;
