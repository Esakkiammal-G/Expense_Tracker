import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post('/users/register', values);
      message.success('Registration successfully');
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setLoading(false);
      message.error('Something went wrong');
      console.log(err);
    }
  };

  // Prevent login
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="w-full max-w-sm bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 border border-gray-300"
        onFinish={onFinish}
      >
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-6 text-center">
          Register
        </h1>
        <Form.Item
          label={<span className="text-lg font-medium text-gray-700">Name</span>}
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500" />
        </Form.Item>
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
            Register
          </Button>
        </Form.Item>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Already Registered?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-purple-600 font-semibold transition duration-300">
              Click Here to Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Register;
