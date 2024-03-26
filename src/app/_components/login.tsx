import {
	type ChangeEvent,
	type Dispatch,
	type SetStateAction,
	useState,
	useEffect,
} from 'react';
import Box from './box';
import { api } from '../../trpc/react';
import toast from 'react-hot-toast';
import Button from './button';
import { type User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import useLocalStorage from '../hooks/useLocalStorage';

type LoginProps = {
	type: string;
	setUser: Dispatch<SetStateAction<User | null | void>>;
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

const loginState = {
	email: '',
	password: '',
};

const signupState = {
	name: '',
	...loginState,
};

type LoginState = {
	email: string;
	password: string;
};

type SignupState = {
	name: string;
	email: string;
	password: string;
};

type UserState = LoginState | SignupState;

const getFormState = (isLoginForm: boolean) => {
	return isLoginForm ? loginState : signupState;
};

export const createMutationOptions = (
	onSuccessExtra?: (data: User | void) => Promise<void> | void
) => {
	return {
		onSuccess: async (data: User | void) => {
			if (onSuccessExtra) await onSuccessExtra(data);
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (e: any) => {
			if (e instanceof Error)
				toast.error(e?.message || 'Something went wrong');
		},
	};
};

const Login = ({ type, setUser, toggleForm }: LoginProps) => {
	const router = useRouter();
	const { setValue: setUserData } = useLocalStorage<object>('user', {});
	const isLoginForm = type === 'login';

	const componentData: LoginDefaultProps = isLoginForm
		? defaultFormData.login
		: defaultFormData.signup;

	const { heading, subHeadings, buttonText, redirect } = componentData;

	const [formData, setFormData] = useState<UserState>(
		getFormState(isLoginForm)
	);

	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		setFormData(getFormState(isLoginForm));
	}, [type, isLoginForm]);

	const { mutate: mutateVerificationCode } =
		api.user.sendVerificationCode.useMutation(
			createMutationOptions(() => {
				// toast.success('');
				toast.success(
					'Verification code has been sent to your account'
				);
				setFormData(getFormState(isLoginForm));
			})
		);

	const { mutate: mutateSignup, isPending: isPendingSignup } =
		api.user.signup.useMutation(
			createMutationOptions((data) => {
				if (data?.email) {
					setUser(data);
					toast.success('Account successfully created.');
					mutateVerificationCode({ email: data?.email });
				}
				setFormData(getFormState(isLoginForm));
			})
		);

	const { mutate: mutateLogin, isPending: isPendingLogin } =
		api.user.login.useMutation(
			createMutationOptions(async (data) => {
				if (data?.email) {
					setUser(data);
					if (!data?.isVerified) {
						toast.success('Please verify your account');
						mutateVerificationCode({ email: data?.email });
					} else {
						setUserData(data);
						router.push('/categories');
					}
				}

				setFormData(getFormState(isLoginForm)); // toast.success('');
			})
		);

	const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = () => {
		if (Object.values(formData).some((item) => item.length <= 0)) {
			toast.error('Please fill all the fields!');
			return;
		}
		console.log(formData);
		if (isLoginForm) {
			mutateLogin({ ...formData });
		} else {
			mutateSignup({ ...formData } as SignupState);
		}
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
							value={(formData as SignupState).name}
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
				<Button
					onClick={handleFormSubmit}
					withLoader={isPendingLogin || isPendingSignup}
					text={buttonText}
				/>
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
