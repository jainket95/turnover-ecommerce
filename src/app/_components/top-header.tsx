'use client';
import { type User } from '@prisma/client';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TopHeader = () => {
	const router = useRouter();

	const { storedValue: user, removeValue } = useLocalStorage<User>('user');
	const [name, setName] = useState(user.name);

	const handleLogout = () => {
		removeValue('user');
		router.push('/');
		setName('');
	};

	useEffect(() => {
		if (user) setName(user.name);
	}, [user, user.name]);

	return (
		<div className="max-w-100 align-center flex  justify-end px-6 pt-3">
			<div className="flex gap-x-12 text-[14px]">
				<a href="#" className="font-normal leading-3 text-gray-400">
					Help
				</a>
				<a href="#" className="font-normal leading-3 text-gray-400">
					Orders & Returns
				</a>
				{name && (
					<a href="#" className="font-normal leading-3 text-gray-400">
						Hi, {name}
					</a>
				)}
				{name && (
					<p
						className="cursor-pointer font-normal leading-3 text-gray-400"
						onClick={handleLogout}
					>
						Log out
					</p>
				)}
			</div>
		</div>
	);
};

export default TopHeader;
