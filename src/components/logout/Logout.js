import React from 'react'
import { Button, message } from 'antd';
import { auth } from '../../firebase/Config';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router';
import './Logout.css'
import { LogoutOutlined } from '@ant-design/icons'
const Logout = () => {
    const Navigate = useNavigate();

    const logout = () => {

        signOut(auth).then(() => {
            message.success('Successfully logout');     
            Navigate('/login')
            // Sign-out successful.
        }).catch((error) => {
            const errorMessage = error.message;
            message.error(errorMessage);
            // An error happened.
        })

    }

    return (
        <div className='logout-button'>
            <Button type="danger" onClick={logout} >
            Logout <LogoutOutlined type='danger'/>  
            </Button>
        </div>
    )
}
export default Logout;