import { type ChangeEvent, useState } from 'react';
import Box from './box';

type LoginProps = {
	type: string;
	toggleForm: () => void;
};

type LoginDefaultProps = {
	heading: string;
	subHeadings: {
		heading1: string;
		heading2: string;
	} | null;
	buttonText: string;
	redirect: {
		text: string;
		actionText: string;
	};
};

const defaultFormData = {
	login: {
		heading: 'Login',
		subHeadings: {
			heading1: 'Welcome back to ',
			heading2: 'The next gen business marketplace',
		},
		buttonText: 'login',
		redirect: {
			text: "Don't have an Account?",
			actionText: 'sign up',
		},
	},
	signup: {
		heading: 'Create your account',
		subHeadings: null,
		buttonText: 'create account',
		redirect: {
			text: 'Have an Account?',
			actionText: 'login',
		},
	},
};

const Login = ({ type, toggleForm }: LoginProps) => {
	const isLoginForm = type === 'login';

	const componentData: LoginDefaultProps = isLoginForm
		? defaultFormData.login
		: defaultFormData.signup;

	const { heading, subHeadings, buttonText, redirect } = componentData;

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<Box boxData={{ heading, subHeadings }} isLogin={isLoginForm}>
			<div className="flex w-full flex-col items-start justify-start py-8">
				{!isLoginForm && (
					<div className="mb-8 flex w-full flex-col items-start justify-stretch">
						<label className="text-normal mb-1" htmlFor="name">
							Name
						</label>
						<input
							className="h-12 w-full rounded-md border border-gray-400 p-2"
							type="text"
							name="name"
							id="name"
							value={formData.name}
							onChange={handleFormDataChange}
							placeholder="Enter"
						/>
					</div>
				)}
				<div className="mb-8 flex w-full flex-col items-start justify-stretch">
					<label className="text-normal mb-1" htmlFor="email">
						Email
					</label>
					<input
						className="h-12 w-full rounded-md border border-gray-400 p-2"
						type="text"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleFormDataChange}
						placeholder="Enter"
					/>
				</div>
				<div className="relative mb-8 flex w-full flex-col items-start justify-stretch">
					<label className="text-normal mb-1" htmlFor="password">
						Password
					</label>
					<input
						className="h-12 w-full rounded-md border border-gray-400 p-2"
						type={showPassword ? 'text' : 'password'}
						name="password"
						id="password"
						value={formData.password}
						onChange={handleFormDataChange}
						placeholder="Enter"
					/>
					{formData.password.length > 4 && (
						<div
							className="absolute bottom-3 right-4 cursor-pointer font-light capitalize text-gray-800 underline"
							onClick={setShowPassword.bind(null, !showPassword)}
						>
							{!showPassword ? 'show' : 'hide'}
						</div>
					)}
				</div>
				<button className="h-14 w-full rounded-md  bg-black font-normal uppercase text-white">
					{buttonText}
				</button>
				<div className="w-full border-b border-gray-300 py-3.5"></div>
			</div>
			<p className="font-light text-gray-700">
				{redirect.text}
				<span
					className="mx-auto cursor-pointer pl-2 font-normal uppercase text-black"
					onClick={toggleForm}
				>
					{redirect.actionText}
				</span>
			</p>
		</Box>
	);
};

export default Login;
