import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/Config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        const {email, password} = values;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const useruid = user.uid;
                localStorage.setItem('currentuser', useruid)
                message.success('Successfully login');            
                navigate('/home')
            })
            .catch((error) => {
                const errorMessage = error.message;
                message.error(errorMessage);
            })
    };
    return (
        <div className='login'>
            <h1 className='heading-login' id='survey-login'> <b> C&G - SURVEY </b></h1>
            <Form name="normal_login" className="login-form" onFinish={onFinish} >
                <h1 className='heading-login' id='sign-heading-login'> Sign in </h1>
                <Form.Item name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input className='input-here' prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>

                <Form.Item name="password" className='input-login'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password className='input-here' prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Link className="login-form-forgot link" to="/forget">
                        Forgot password
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Button type="danger" htmlType="submit" className="login-form-button">
                        Login
                    </Button>
                    <br /> <br />
                    Or <Link to="/signup" className='link' >register now!</Link>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login;