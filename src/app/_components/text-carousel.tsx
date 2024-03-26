'use client';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const carouselData: string[] = [
	'Sign up for our business plan and get 15% off.',
	'Register your business now for a 20% discount.',
	'Sign up today for 10% off your first month.',
	'Register now for exclusive deals and 5% off.',
];

const TextCarousel = () => {
	const [count, setCount] = useState(0);

	const toggleCarousel = (direction: string) => {
		switch (direction) {
			case 'left':
				if (count === 0) {
					setCount(carouselData.length - 2);
					return;
				}
				setCount((prevCount) => --prevCount);
				break;
			case 'right':
				if (count === carouselData.length - 1) {
					setCount(0);
					return;
				}
				setCount((prevCount) => ++prevCount);
				break;
			default:
				return;
		}
	};

	return (
		<div className="my-6 flex w-full items-center justify-center">
			<div
				className="mr-4 h-5 w-5 text-gray-900"
				onClick={toggleCarousel.bind(null, 'left')}
			>
				<ChevronLeftIcon />
			</div>
			<div className="w-96 text-center text-gray-600">
				{carouselData[count]}
			</div>
			<div
				className="ml-4 h-5 w-5  text-gray-900"
				onClick={toggleCarousel.bind(null, 'right')}
			>
				<ChevronRightIcon />
			</div>
		</div>
	);
};

export default TextCarousel;
