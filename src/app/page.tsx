'use client';

import { useState } from 'react';
import Login from './_components/login';
import Verification from './_components/verification';
import { type User } from '@prisma/client';

enum formType {
	login = 'login',
	signup = 'signup',
}

export default function Home() {
	const [form, setForm] = useState(formType.login);
	const [user, setUser] = useState<User | null | void>(null);

	const handleFormToggle = () => {
		setForm(form === formType.login ? formType.signup : formType.login);
	};

	return (
		<>
			{!user && (
				<Login
					type={form}
					toggleForm={handleFormToggle}
					setUser={setUser}
				/>
			)}
			{user && !user.isVerified && (
				<Verification email={user.email} setUser={setUser} />
			)}
		</>
	);
}
