export type Categories = { data: string[] };

export type Category = {
	id: string;
	name: string;
	isChecked: boolean;
};

export type Page = {
	pageData: Category[];
	page: number;
	start: number;
	end: number;
};
