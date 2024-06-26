import { faker } from '@faker-js/faker';
import { type Category } from '~/app/types';

export const generateRandom = (length: number): string => {
	return Math.random()
		.toString()
		.slice(2, length + 2);
};

type CategoryType = 'commerce' | 'color';

const getFakeCategory = (id: string, type: CategoryType) => {
	return {
		id,
		name:
			type === 'commerce'
				? faker.commerce.department()
				: faker.color.human(),
		isChecked: false,
	};
};

export const generateFakeCategories = (count = 100) => {
	const categories = new Map<
		string,
		{ id: string; name: string; isChecked: boolean }
	>();

	for (let i = 0; i < count; i++) {
		const types: CategoryType[] = ['commerce', 'color'];
		types.forEach((type) => {
			const category = getFakeCategory(generateRandom(i), type);
			categories.set(category.name, category);
		});
	}

	return Array.from(categories.values()).sort(
		(itemA: Category, itemB: Category) =>
			Number(itemA.id) - Number(itemB.id) ? -1 : 1
	);
};
