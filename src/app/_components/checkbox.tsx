import { CheckIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';

type CheckboxProps = {
	isChecked: boolean;
	text: string;
};

const Checkbox = ({ isChecked, text }: CheckboxProps) => {
	const [isBoxChecked, setIsBoxChecked] = useState(isChecked || false);

	useEffect(() => {
		setIsBoxChecked(isChecked);
	}, [isChecked, setIsBoxChecked]);

	const handleChange = () =>
		//  e: ChangeEvent<HTMLInputElement> | MouseEventHandler<HTMLDivElement>,
		{
			setIsBoxChecked(!isBoxChecked);
		};

	return (
		<div className="checkbox my-[.7rem]">
			<label
				htmlFor={text}
				className="inline-flex cursor-pointer items-center"
			>
				<input
					type="checkbox"
					className="hidden"
					id={text}
					name={text}
					checked={isBoxChecked}
					onChange={handleChange}
				/>
				<div
					className={`mr-3 flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-[5px] border-2  ${
						isBoxChecked
							? 'border-black bg-black'
							: 'border-gray-300 bg-gray-300'
					}`}
					onClick={handleChange}
				>
					{isBoxChecked && (
						<CheckIcon className="text-lg font-bold text-white" />
					)}
				</div>
				{text && (
					<span className="text-md font-normal capitalize">
						{text}
					</span>
				)}
			</label>
		</div>
	);
};

export default Checkbox;
