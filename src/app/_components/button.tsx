import Loader from './Loader';

type ButtonProps = {
	text: string;
	withLoader: boolean;
	classes?: string;
	onClick: () => void;
};
const Button = ({ text, withLoader, classes = '', onClick }: ButtonProps) => {
	return (
		<button
			type="button"
			disabled={withLoader}
			className={`h-14 w-full rounded-md bg-black font-normal uppercase text-white ${classes}${
				withLoader ? ' flex items-center justify-center' : ''
			}`}
			onClick={onClick}
		>
			{withLoader && <Loader />}
			{text}
		</button>
	);
};

export default Button;
