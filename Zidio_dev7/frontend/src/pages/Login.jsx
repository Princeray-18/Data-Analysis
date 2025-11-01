import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d2b] px-4">
			<div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-gray-900 border border-gray-700">
				<h1 className="text-3xl font-semibold text-center text-gray-200 mb-6">
					Login <span className="text-blue-400">XL Data Analysis</span>
				</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-1">
							Username
						</label>
						<input
							type="text"
							placeholder="Enter username"
							className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-300 mb-1">
							Password
						</label>
						<input
							type="password"
							placeholder="Enter password"
							className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<Link
						to="/signup"
						className="text-sm hover:underline text-blue-400 block mt-2"
					>
						Don&apos;t have an account?
					</Link>

					<div>
						<button
							className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold shadow-md transition disabled:opacity-50"
							disabled={loading}
						>
							{loading ? (
								<span className="loading loading-spinner"></span>
							) : (
								"Login"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
