import { CheckIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

type CheckboxProps = {
	isChecked: boolean;
	text: string;
	handleCategoryUpdate: (name: string) => void;
};

const Checkbox = ({ isChecked, text, handleCategoryUpdate }: CheckboxProps) => {
	const [isBoxChecked, setIsBoxChecked] = useState(isChecked);

	useEffect(() => {
		setIsBoxChecked(isChecked);
	}, [isChecked, setIsBoxChecked, isBoxChecked]);

	const handleChange = () => {
		setIsBoxChecked((prevChecked) => !prevChecked);
		handleCategoryUpdate(text);
	};

	return (
		<div className="checkbox my-[.7rem] inline-flex cursor-pointer items-center">
			<div
				className={`mr-3 flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-[5px] border-2 ${
					isBoxChecked
						? 'border-black bg-black'
						: 'border-gray-300 bg-gray-300'
				}`}
				onClick={handleChange}
			>
				<CheckIcon
					className={`text-lg font-bold text-white ${!isBoxChecked ? 'hidden' : 'block'}`}
				/>
			</div>
			{text && (
				<span className="text-md font-normal capitalize">{text}</span>
			)}
		</div>
	);
};

export default Checkbox;
