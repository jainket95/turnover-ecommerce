'use client';

// import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";
import { Header } from './_components/header';
import TopHeader from './_components/top-header';
import { useState } from 'react';
import TextCarousel from './_components/text-carousel';
import Categories from './_components/categories';

enum formType {
	login = 'login',
	signup = 'signup',
}

export default function Home() {
	// const hello = await api.user.hello({ text: "from new user" });
	const [form, setForm] = useState(formType.signup);

	const handleFormToggle = () => {
		setForm(form === formType.login ? formType.signup : formType.login);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-start text-white">
			<div className="w-full text-black">
				<TopHeader />
				<Header />
				<TextCarousel />
				{/* <Login type={form} toggleForm={handleFormToggle} /> */}
				<Categories />
				{/* {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost /> */}
			</div>
		</main>
	);
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full text-black">
//       <TopHeader />
//       <Header />
//       <Login />
//       {/* {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost /> */}
//     </div>
//   );
// }
