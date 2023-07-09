import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { checkBothPasswords, handleRememberMe } from "../AdminLogInMangager";
import { User } from "../../../../App";
import { useLocation, useNavigate } from "react-router-dom";
import config from '../../../../config.json'
//:::: Create_An_Account Form ::://
const AdminCreateAccountForm = ({ setUserLogIn }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user, setUser] = useContext(User);
    const [formValidate, setFormValidate] = useState({ passwordMatched: false, error: '' });

    const location = useLocation();
    const navigate = useNavigate();
    const { from } = location.state || { from: { pathname: '/' } };

    // Create_account_btn handler
    const onSubmit = (data) => {
        checkBothPasswords(data, formValidate, setFormValidate);
        formValidate.passwordMatched && handleAccountCreation(data);
    };

    const handleAccountCreation = (data) => {
        // Handle account creation logic here (e.g., API call, database insertion, etc.)

        // Set user info inside User_Context API
        const userInfo = { ...user };
        userInfo.email = data.email;
        userInfo.username = data.firstName;
        userInfo.error = '';
        setUser(userInfo);

        // RememberMe stores user (email-password)
        handleRememberMe(data);
        localStorage.setItem('username', JSON.stringify(data.firstName));
        localStorage.setItem('userLoggedIn', JSON.stringify(true));

        // redirect user on previous route
        navigate(from);
    };
    async function postData() {
        const data = {
            "id": 2,
            "name": document.getElementById('firstNameInput').value.toString(),
            "email": document.getElementById('email').value.toString(),
            "password": document.getElementById('password').value.toString(),
        };

        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });

        // Handle the response here (e.g., check status code, parse JSON, etc.)
    }
    return (
        // async function postdata ()  {
        //     data = {
        //         "name" : ,
        //         "email" : ,
        //         "password" : 
        //     };
        //   await axios.post(config.base_url + '/signup',
        //   data,
        //   {
        //     headers : {
        //         "Content-Type": "application/json"
        //     }
        //   }
        //   )
        // }
        

        < div >
        <form onSubmit={handleSubmit(onSubmit)} className='mb-0 tw-space-y-2'>
            {/*First Name */}
            <div>
                <label className='mb-2 tw-text-sm'>First Name</label>
                <input required className='form-control form-control-sm'
                    type="text"
                    name="firstName"
                    id="firstNameInput"
                    {...register("firstName", {
                        required: true,
                    })}
                />
            </div>

            {/*Last Name */}
            <div>
                <label className='mb-2 tw-text-sm'>Last Name</label>
                <input required className='form-control form-control-sm'
                    type="text"
                    name="lastName"
                    {...register("lastName", {
                        required: true,
                    })}
                />
            </div>
            <div>
    <label className='mb-2 tw-text-sm'>Phone Number</label>
    <input
        required
        className='form-control form-control-sm'
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        {...register("phoneNumber", {
            required: true,
            pattern: {
                value: /^\d{10}$/,
                message: "Invalid phone number. Please enter a 10-digit number.",
            },
        })}
    />
    {errors.phoneNumber && <p className='text-danger'>{errors.phoneNumber.message}</p>}
</div>

            {/* Email */}
            <div>
                <label className='mb-2 tw-text-sm'>Email</label>
                <input required className='form-control form-control-sm'
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </div>
            <div>
    <label className='mb-2 tw-text-sm'>Place</label>
    <input
        required
        className='form-control form-control-sm'
        type="text"
        name="place"
        id="place"
        {...register("place", {
            required: true,
        })}
    />
    {errors.place && <p className='text-danger'>Place is required</p>}
</div>
<div>
    <label className='mb-2 tw-text-sm'>Availability</label>
    <div className="d-flex">
        <input
            required
            className='form-control form-control-sm me-2'
            type="time"
            name="availabilityFrom"
            id="availabilityFrom"
            {...register("availabilityFrom", {
                required: true,
            })}
        />
        <span className="me-2">to</span>
        <input
            required
            className='form-control form-control-sm'
            type="time"
            name="availabilityTo"
            id="availabilityTo"
            {...register("availabilityTo", {
                required: true,
            })}
        />
    </div>
    {errors.availabilityFrom && <p className='text-danger'>Availability from is required</p>}
    {errors.availabilityTo && <p className='text-danger'>Availability to is required</p>}
</div>

            {/* Password */}
            <div>
                <label className='mb-2 tw-text-sm'>Password</label>
                <input required className='form-control form-control-sm'
                    type="password"
                    name="password"
                    id="password"
                    {...register("password", {
                        required: true,
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long",
                        },
                    })} />
                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
            </div>
   
            {/*Confirm Password */}
            <div>
                <label className='mb-2 tw-text-sm'>Confirm Password</label>
                <input required className='form-control form-control-sm'
                    type="password"
                    name="confirmPassword"
                    {...register("confirmPassword", {
                        required: true,
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long",
                        },
                    })} />
                {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
                <p className='text-danger'>{formValidate.error}</p>
            </div>

            <div className="mt-4">
                {/* Authentication error goes here */}
                <p className="text-center mb-2 text-danger">{user.createAccountError}</p>

                <button className='btn btn-warning fw-semibold w-100' type="submit" onClick={() => postData()} >Create an account</button>

                {/* 'CreateAnAccount' will toggle this form */}
                <p className="text-center mt-3 tw-text-sm md:tw-text-base">Already have an account? <span onClick={() => setUserLogIn(true)}
                    className="tw-underline tw-text-yellow-500 hover:tw-text-yellow-400">Login</span></p>
            </div>
        </form>  
        </div>   
    );
}
export default AdminCreateAccountForm;
