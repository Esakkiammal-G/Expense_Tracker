import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/users/login', values);
      message.success('Login successfully');
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      message.error('Something went wrong');
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="w-full max-w-sm bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 border border-gray-200"
        onFinish={onFinish}
      >
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-6 text-center">
          Login
        </h1>
        <Form.Item
          label={<span className="text-lg font-medium text-gray-700">Email</span>}
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input type="email" className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500" />
        </Form.Item>
        <Form.Item
          label={<span className="text-lg font-medium text-gray-700">Password</span>}
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:scale-105 transform transition-all duration-300 focus:outline-none"
          >
            Log in
          </Button>
        </Form.Item>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300">
              Register Here
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
