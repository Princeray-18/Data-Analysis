import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black px-4'>
			<div className='w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-gray-700'>
				<h1 className='text-4xl font-bold text-center text-white mb-6'>
					Sign Up <span className='text-blue-400'>XL Data Analysis</span>
				</h1>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-200 mb-1'>Full Name</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-200 mb-1'>Username</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-200 mb-1'>Password</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-200 mb-1'>Confirm Password</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline text-blue-400 mt-2 inline-block'
					>
						Already have an account?
					</Link>

					<div>
						<button
							className='w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-50'
							disabled={loading}
						>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
