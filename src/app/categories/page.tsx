'use client';
import { useEffect, useState } from 'react';
import Box from '../_components/box';
import Checkbox from '../_components/checkbox';
import Pagination from '../_components/pagination';
import { generateFakeCategories } from '~/utils';
import { api } from '~/trpc/react';
import { createMutationOptions } from '../_components/login';
import toast from 'react-hot-toast';
import { type Categories, type Category, type Page } from '../types';
import { useRouter } from 'next/navigation';
import useLocalStorage from '../hooks/useLocalStorage';
import { type User } from '@prisma/client';

const boxData = {
	heading: 'Please mark your interests!',
	subHeadings: {
		heading1: '',
		heading2: 'We will keep you notified.',
	},
};

const perPageRows = 6;

const initialPageState: Page = {
	pageData: [],
	page: 1,
	start: 0,
	end: perPageRows,
};

const categoriesData = generateFakeCategories();

const Page = () => {
	const router = useRouter();
	const { storedValue: user } = useLocalStorage<User>('user');
	const [categories, setCategories] = useState<Category[]>([]);
	const [page, setPage] = useState(initialPageState);

	if (!user) router.push('/');

	useEffect(() => {
		handleCategoriesUpdate();
	}, [categories.length]);

	const { mutate } = api.user.updateCategories.useMutation(
		createMutationOptions((data) => {
			if (data?.email) {
				toast.success('Interest saved!');
			}
		})
	);

	const totalPages = () => {
		const totalUsers = categories.length;
		const totalPages = Math.ceil(totalUsers / perPageRows);
		return totalPages;
	};

	const handlePageChange = (type: number | string) => {
		if (typeof type === 'string') {
			switch (type) {
				case 'first':
					setPage({
						...initialPageState,
						pageData: categories.slice(
							initialPageState.start,
							initialPageState.end
						),
					});
					return;
				case 'prev':
					if (page.page === 1) return;

					setPage({
						pageData: categories.slice(
							page.start - perPageRows,
							page.end - perPageRows
						),
						page: page.page - 1,
						start: page.start - perPageRows,
						end: page.end - perPageRows,
					});
					return;
				case 'next':
					if (page.page === totalPages()) return;
					setPage({
						pageData: categories.slice(
							page.start + perPageRows,
							page.end + perPageRows
						),
						page: page.page + 1,
						start: page.start + perPageRows,
						end: page.end + perPageRows,
					});
					return;
				case 'last':
					{
						const start = perPageRows * (totalPages() - 1);
						setPage({
							pageData: categories.slice(
								start,
								start +
									categories.slice(start, categories.length)
										.length
							),
							page: totalPages(),
							start,
							end:
								start +
								categories.slice(start, categories.length)
									.length,
						});
					}
					return;
				default:
					return;
			}
		} else if (typeof type === 'number') {
			setPage({
				pageData: categories.slice(
					perPageRows * (type - 1),
					perPageRows * type
				),
				page: type,
				start: perPageRows * (type - 1),
				end: perPageRows * type,
			});
		}
	};

	const handleCategoriesUpdate = () => {
		const userCategories: Categories = JSON.parse(
			user.categories as string
		) as Categories;

		if (userCategories.data.length > 0) {
			const updatedCategories: Category[] = categoriesData.map(
				(category) => {
					const userCategory = userCategories.data.find(
						(uc: Category) => uc.name === category.name
					);

					return {
						...category,
						isChecked: userCategory
							? userCategory.isChecked
							: category.isChecked,
					};
				}
			);

			setCategories(updatedCategories);
			setPage({
				...page,
				pageData: updatedCategories.slice(page.start, page.end),
			});
		} else {
			setCategories(categoriesData);
			setPage({
				...page,
				pageData: categoriesData.slice(page.start, page.end),
			});
		}
	};

	const handleCategoryUpdate = (name: string) => {
		const updatedCategories = categories.map((category) => {
			if (category.name === name) {
				return {
					...category,
					isChecked: !category.isChecked,
				};
			}
			return category;
		});

		mutate({ email: user.email, categories: { data: updatedCategories } });

		setCategories(() => updatedCategories);
		setPage(() => ({
			...page,
			pageData: updatedCategories.slice(page.start, page.end),
		}));
	};

	return (
		<Box boxData={boxData}>
			<div className="m-8 flex w-full flex-col items-start justify-stretch">
				<h2 className="mb-4 text-[1.36rem] font-normal">
					My saved interests!
				</h2>
				{categories.length === 0 ? (
					<h1>Loading Categories...</h1>
				) : (
					<>
						<div className="mb-12 flex flex-col items-start justify-center">
							{page.pageData.map((category) => (
								<Checkbox
									key={category.id}
									isChecked={category.isChecked}
									text={category.name}
									handleCategoryUpdate={handleCategoryUpdate}
								/>
							))}
						</div>

						<Pagination
							page={page.page}
							totalPages={totalPages()}
							handlePageChange={handlePageChange}
						/>
					</>
				)}
			</div>
		</Box>
	);
};

export default Page;
