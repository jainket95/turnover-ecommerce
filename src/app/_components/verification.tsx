import { type Dispatch, type SetStateAction, useState } from 'react';
import Box from './box';
import VerificationInput from './verification-input';
import { api } from '~/trpc/react';
import { createMutationOptions } from './login';
import toast from 'react-hot-toast';
import { type User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Button from './button';

const verificationData = (email: string) => ({
	heading: 'Verify your email',
	subHeadings: {
		heading1: '',
		heading2: `Enter the 8 digit code you have received on ${email}`,
	},
});
type VerificationProps = {
	email: string;
	setUser: Dispatch<SetStateAction<User | null | void>>;
};
const Verification = ({ email, setUser }: VerificationProps) => {
	const router = useRouter();
	const [code, setCode] = useState<string[]>(new Array(8).fill(''));

	const { mutate, isPending } = api.user.verifyCode.useMutation(
		createMutationOptions((data) => {
			if (data?.email && data.isVerified) {
				setUser(data);
				toast.success('Account Verified Successfully');
				setCode(new Array(8).fill(''));

				router.push('/categories');
			}
		})
	);

	const handleVerifySubmit = () => {
		mutate({ email, code: code.join('') });
	};
	return (
		<Box boxData={verificationData(email)}>
			<div className="m-8 flex w-full flex-col items-start justify-stretch">
				<h2 className="mb-4 text-[1.36rem] font-normal capitalize">
					code
				</h2>

				<VerificationInput code={code} setCode={setCode} />

				<Button
					onClick={handleVerifySubmit}
					withLoader={isPending}
					text="Verify"
				/>
			</div>
		</Box>
	);
};

export default Verification;
