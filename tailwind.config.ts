import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			strokeWidth: {
				'2': '4px',
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
			},
		},
	},
	plugins: [],
} satisfies Config;
