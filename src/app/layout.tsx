import '~/styles/globals.css';

import { Inter } from 'next/font/google';

import { TRPCReactProvider } from '~/trpc/react';

import { Toaster } from 'react-hot-toast';
import Header from './_components/header';
import TextCarousel from './_components/text-carousel';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata = {
	title: 'E-commerce App',
	description: 'E-commerce App with categories and services.',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`font-sans ${inter.variable}`}>
				<main className="flex min-h-screen flex-col items-center justify-start text-white">
					<div className="w-full bg-white text-black">
						<Header />
						<TextCarousel />
						<TRPCReactProvider>{children}</TRPCReactProvider>
						<Toaster
							position="bottom-right"
							reverseOrder={false}
							gutter={8}
							toastOptions={{
								duration: 2600,
								style: {
									background: '#282c34',
									color: '#fff',
								},
							}}
						/>
					</div>
				</main>
			</body>
		</html>
	);
}
