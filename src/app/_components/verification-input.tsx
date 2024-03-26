import {
	type ChangeEvent,
	type Dispatch,
	type KeyboardEvent,
	type SetStateAction,
	useRef,
} from 'react';

type VerificationInputProps = {
	code: string[];
	setCode: Dispatch<SetStateAction<string[]>>;
};

const VerificationInput = ({ code, setCode }: VerificationInputProps) => {
	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

	const handleChange = (
		index: number,
		event: ChangeEvent<HTMLInputElement>
	) => {
		const newCode = [...code];
		newCode[index] = event.target.value;
		setCode(newCode);

		if (index < 7 && event.target.value) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleBackspace = (
		index: number,
		event: KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === 'Backspace' && !code[index] && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	return (
		<div className="mb-12 flex w-full items-center justify-between">
			{code.map((digit, index) => (
				<input
					key={index}
					type="text"
					maxLength={1}
					value={digit}
					onChange={(event) => handleChange(index, event)}
					onKeyDown={(event) => handleBackspace(index, event)}
					ref={(ref) => {
						inputsRef.current[index] = ref;
					}}
					className="h-12 w-11 rounded-sm border border-gray-400 text-center"
				/>
			))}
		</div>
	);
};

export default VerificationInput;
