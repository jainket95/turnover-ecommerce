import {
	MagnifyingGlassIcon,
	ShoppingCartIcon,
} from '@heroicons/react/24/outline';
export function Header() {
	return (
		<header className="bg-white">
			<nav
				className="max-w-100 mt-6 flex items-center justify-between px-6"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<a href="#" className="-m-1.5 p-1.5">
						<span className="text-4xl font-semibold uppercase text-black">
							ecommerce
						</span>
					</a>
				</div>
				<div className="lg:flex lg:gap-x-12">
					<a
						href="/categories"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Categories
					</a>
					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Sale
					</a>
					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Clearance
					</a>
					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						New stock
					</a>
					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Trending
					</a>
				</div>
				<div className="flex flex-1 justify-end">
					<div className="mr-10 w-7 text-gray-900">
						<MagnifyingGlassIcon />
					</div>
					<div className="w-7 text-gray-900">
						<ShoppingCartIcon />
					</div>
				</div>
			</nav>
		</header>
	);
}
