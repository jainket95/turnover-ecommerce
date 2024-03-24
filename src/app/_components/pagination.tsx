type PaginationProps = {
	page: number;
	totalPages: number;
	handlePageChange: (type: number | string) => void;
};

const Pagination = ({
	page,
	totalPages,
	handlePageChange,
}: PaginationProps) => {
	return (
		<div className="flex items-center justify-start text-[1.35rem] font-normal text-gray-400">
			<div
				className="mr-3"
				onClick={handlePageChange.bind(null, 'first')}
			>
				{'<<'}
			</div>
			<div className="mr-3" onClick={handlePageChange.bind(null, 'prev')}>
				{'<'}
			</div>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
				<div
					className={`mr-3 ${page === item ? 'text-black' : ''}`}
					key={item}
					onClick={handlePageChange.bind(null, item)}
				>
					{item}
				</div>
			))}
			<div className="mr-3" onClick={handlePageChange.bind(null, 'next')}>
				{'>'}
			</div>
			<div className="mr-3" onClick={handlePageChange.bind(null, 'last')}>
				{'>>'}
			</div>
		</div>
	);
};

export default Pagination;
