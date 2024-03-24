import Box from './box';
import Checkbox from './checkbox';
import Pagination from './pagination';

const boxData = {
	heading: 'Please mark your interests!',
	subHeadings: {
		heading1: '',
		heading2: 'We will keep you notified.',
	},
};

const perPageRows = 6;

const Categories = () => {
	const totalPages = () => {
		const totalUsers = 40;
		const totalPages = Math.ceil(totalUsers / perPageRows);
		return totalPages;
	};

	const handlePageChange = () => {
		console.log('page');
	};

	return (
		<Box boxData={boxData}>
			<div className="m-8 flex w-full flex-col items-start justify-stretch">
				<h2 className="mb-4 text-[1.36rem] font-normal">
					My saved interests!
				</h2>

				<div className="mb-12 flex flex-col items-start justify-center">
					<Checkbox isChecked={false} text={'shoes'} />
				</div>

				<Pagination
					page={4}
					totalPages={totalPages()}
					handlePageChange={handlePageChange}
				/>
			</div>
		</Box>
	);
};

export default Categories;
