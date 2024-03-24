import { type ReactNode } from 'react';

type BoxProps = {
	children: ReactNode;
	boxData: {
		heading: string;
		subHeadings: {
			heading1: string;
			heading2: string;
		} | null;
	};
	isLogin?: boolean;
};

const Box = ({ children, boxData, isLogin = false }: BoxProps) => {
	const { heading, subHeadings } = boxData;
	return (
		<div
			className="mx-auto  my-6 flex max-w-xl flex-col
items-center justify-start rounded-2xl border border-gray-400
p-10"
		>
			<h2 className="pb-8 text-3xl font-semibold">{heading}</h2>

			{subHeadings && Object.keys(subHeadings).length > 0 && (
				<>
					{subHeadings.heading1 && (
						<p className="pb-3 text-2xl font-normal">
							{subHeadings.heading1}{' '}
							{isLogin && (
								<span className="uppercase">ecommerce</span>
							)}
						</p>
					)}
					{subHeadings.heading2 && (
						<p className="font-light">{subHeadings.heading2}</p>
					)}
				</>
			)}
			{children}
		</div>
	);
};

export default Box;
