import { faker } from '@faker-js/faker';

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
			const category = getFakeCategory(`${i}-${type}`, type);
			categories.set(category.name, category);
		});
	}

	return Array.from(categories.values());
};
