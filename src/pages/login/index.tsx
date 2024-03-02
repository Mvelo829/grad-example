import { Alert, Button, Checkbox, Form, Input, message } from 'antd';
import React, { useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import styles from "./Login.module.scss";
import { AuthStateContext, IAuthLogin } from '../providers/AuthProvider/context';
import { AuthActionContext } from '../providers/AuthProvider/context';
import { useNavigate } from 'react-router-dom';
const Login: React.FC = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthActionContext)
  const {error} = useContext(AuthStateContext)

  const ErrorLogin: React.FC = () =>  <Alert message="Invalid username or password" type="error" showIcon />;

  const onFinish = (values: any) => {
    const input:IAuthLogin ={password:values.password,userNameOrEmailAddress:values.username,rememberClient:values.remember}
    login(input).then((response) => {
      localStorage.setItem('token', response.result.accessToken);
      localStorage.setItem('userId', response.result.userId.toString());
      if(response.success){
        navigate('/home', { replace: true });
      }
    })
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.logincontainer}>
      <Form
        className={styles.loginform} 
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
