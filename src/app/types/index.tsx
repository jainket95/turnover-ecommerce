export type Categories = { data: Category[] };

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

export type LoginState = {
	email: string;
	password: string;
};

export type SignupState = {
	name: string;
	email: string;
	password: string;
};

export type UserState = LoginState | SignupState;

export type LoginDefaultProps = {
	heading: string;
	subHeadings: {
		heading1: string;
		heading2: string;
	} | null;
	buttonText: string;
	redirect: {
		text: string;
		actionText: string;
	};
};
