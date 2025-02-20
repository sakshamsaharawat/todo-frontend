import React, { useState } from 'react';
import "./setting.css";
import { countries } from './Data/Country.list';
import { countryPhoneCodes } from './Data/Country.code';
import { Avatar, IconButton, InputAdornment, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';

const Setting: React.FC = () => {
    const [imageUrl, setImageUrl] = useState("");

    const handleImageChange = async (event: any) => {
        const file = event?.target?.files[0];
        if (!file) return;

        const formData = new FormData()
        formData.append("file", file);
        formData.append("upload_preset", "image_preset");
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dcmtgohkh/image/upload",
                formData
            )
            console.log("image--response------", response.data.url)
            setImageUrl(response.data.secure_url);
        } catch (error: any) {
            toast.error(error.message)
        }
    };
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone_no: "",
            gender: "",
            country: "",
            city: "",
            dob: "",
            address: ""
        },
        onSubmit: async (values) => {
            console.log("Values", values);
        }
    })
    return (
        <div className='p-5'>
            <div className='profile-title pl-4'>
                <h3>Profile</h3>
                <p>Add Or Edit Your Profile Details</p>
            </div>
            <div className='position-relative d-flex align-item-center mt-3'>
                <Avatar
                    alt="User Name"
                    src={imageUrl}
                    sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: "gray",
                        fontSize: "20px",
                    }}
                >
                </Avatar>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    id="upload-avatar"
                />

                <label htmlFor="upload-avatar">
                    <IconButton
                        sx={{
                            position: "relative",
                            bottom: -30,
                            right: 30,
                            backgroundColor: "white",
                            boxShadow: 2,
                            padding: "5px",
                            "&:hover": {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                        component="span"
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </label>
                <p>Take or Upload profile photo</p>
            </div>
            <div className='profile-container mt-5 d-flex '>
                <div className='input-container'>
                    <h4>First Name</h4>
                    <TextField
                        className='profile-input'
                        sx={{
                            height: "10px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                borderColor: "#cbc9c9",
                            },
                            "& .MuiOutlinedInput-root:hover": {
                                borderColor: "#cbc9c9",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#cbc9c9",
                            },
                            "& .MuiInputBase-input": {
                                height: "100%",
                                padding: "10px",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className='input-container'>
                    <h4>Last Name</h4>
                    <TextField
                        className='profile-input'
                        sx={{
                            height: "10px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                borderColor: "#cbc9c9",
                            },
                            "& .MuiOutlinedInput-root:hover": {
                                borderColor: "#cbc9c9",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#cbc9c9",
                            },
                            "& .MuiInputBase-input": {
                                height: "100%",
                                padding: "10px",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                </div>
                <div className='input-container'>
                    <h4>Email</h4>
                    <TextField
                        className='profile-input'
                        sx={{
                            height: "10px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                borderColor: "#cbc9c9",
                            },
                            "& .MuiOutlinedInput-root:hover": {
                                borderColor: "#cbc9c9",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#cbc9c9",
                            },
                            "& .MuiInputBase-input": {
                                height: "100%",
                                padding: "10px",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                </div>

                <div className='mt-3'>
                    <h4>Country</h4>
                    <select
                        className='profile-input border-radius-10'
                    >
                        <option value="">Select country</option>
                        {countries?.map((country, index) => (
                            <option key={country.value + index} value={country.value}>{country.label}</option>
                        ))}


                    </select>
                </div>
                <div className='mt-3'>
                    <h4>City</h4>
                    <input
                        className='profile-input border-radius-10 pl-3'
                    />
                </div>

                <div className='mt-3'>
                    <h4>Dob</h4>
                    <input
                        type='date'
                        className='profile-input border-radius-10 pl-3'
                    />
                </div>
                <div>
                    <h4>Address</h4>
                    <input
                        type='text'
                        className='profile-input border-radius-10 pl-3'
                    />
                </div>
                <div className=''>
                    <h4>Gender</h4>
                    <select
                        className='profile-input border-radius-10'
                    >
                        <option value="">Male</option>
                        <option value="">Female</option>
                        <option value="">Prefer No To Say</option>
                    </select>
                </div>
                <div>
                    <h4>Phone Number</h4>
                    <div className='phoneno-input d-flex'>
                        <select className='code-input border-radius-10'>
                            {countryPhoneCodes.map((code, index) => (
                                <option
                                    key={code.value + index}
                                    value={code.value}
                                >
                                    {code.label}</option>
                            ))}
                        </select>
                        <div>
                            <input
                                className='profile-input border-radius-10 ml-2 pl-3'
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Setting;
