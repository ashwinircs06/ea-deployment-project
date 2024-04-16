import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    gender: 'Male', // Default value
    dateofbirth: ''
  });

  useEffect(() => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      window.location.href = '/home';
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          toast.success('User registered successfully');

          setTimeout(() => {
            window.location.href = '/';
          }, 500);
        } else {
          return response.json().then(data => {
            throw new Error(data.message || 'Error in saving user');
          });
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  };


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800">Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800">Full Name:</label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800">Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-800">Date of Birth:</label>
            <input type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600">Sign Up</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?
          <a href="/" className="text-blue-500 hover:underline"> Sign in here</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
