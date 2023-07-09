import React, { useState } from 'react';
import AdminLogInForm from './AdminLogInForm';
import AdminCreateAccountForm from './AdminCreateAccountForm';

const AdminForms = () => {
    // This state will toggle the forms 
    // True === loginForm || False === Create_account_form
    const [userLogIn, setUserLogIn] = useState(true)

    return (<div>
        <h3 className='tw-text-2xl mb-4 tw-font-bold'>{userLogIn ? 'Login' : 'Create an account'}</h3>

        {userLogIn ? <AdminLogInForm setUserLogIn={setUserLogIn} />
            : <AdminCreateAccountForm setUserLogIn={setUserLogIn} />}
    </div>)
};

export default AdminForms;