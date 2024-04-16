import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function SignIn() {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
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
		fetch(`${process.env.REACT_APP_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Invalid email or password');
				}
			})
			.then(data => {
				localStorage.setItem('isLoggedIn', true);
				localStorage.setItem('userID', data);
				toast.success('Login successful');
				setTimeout(() => {
					window.location.href = '/home';
				}, 500);
			})
			.catch(error => {
				console.error('Error:', error);
				toast.error(error.message);
			});
	};

	return (
		<div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900">
			<div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
				<h1 className="text-3xl mb-6 text-center text-gray-800">Kashem In</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block mb-2 text-gray-800">Email:</label>
						<input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
					</div>
					<div className="mb-6">
						<label className="block mb-2 text-gray-800">Password:</label>
						<input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
					</div>
					<button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600">Sign In</button>
				</form>
				<p className="mt-4 text-center text-gray-800">
					Don't have an account?
					<a href="/signup" className="text-blue-500 hover:underline"> Sign up here</a>
				</p>
			</div>
		</div>
	);
}

export default SignIn;

