import React from 'react';

import PostList from './PostList';

function Home({ posts }) {
	return (
		<div className="Home-main mt-4">
			{posts.length > 0 ? (
				<PostList posts={posts} />
			) : (
				<div className="container-fluid">
					<h3>No posts yet!</h3>
				</div>
			)}
		</div>
	);
}

export default Home;
