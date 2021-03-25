import React from "react";

import PostList from "./PostList";
import { useSelector } from "react-redux";

function Home({ posts }) {
  const titles = useSelector(st => st.postList);
  return (
    <div className="Home-main mt-4">
      {titles.length > 0 ? (
        <PostList posts={titles} />
      ) : (
        <div className="container-fluid">
          <h3>No posts yet!</h3>
        </div>
      )}
    </div>
  );
}

export default Home;
