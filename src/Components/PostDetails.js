import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import NewPostForm from "./NewPostForm";

function PostDetails({ posts, edit, submit, deletePost }) {
  const { postId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const post = posts.find(post => post.id === postId);
  if (!post) return <Redirect to="/" />;
  const initialData = { ...post };

  // return (
  // 	<div className="PostDetails container border" style={{ position: 'relative' }}>
  // 		<div
  // 			className="PostDetails-buttons float-right"
  // 			style={{ position: 'absolute', top: '0.5em', right: '0' }}
  // 		>
  // 			<i className="fas fa-trash btn btn btn-link text-danger" />
  // 			<i className="far fa-edit ml-1 btn btn btn-link text-primary" />
  // 		</div>
  // 		<div className="PostDetails-details">
  // 			<h2>{post.title}</h2>
  // 			<p>
  // 				<i>{post.description}</i>
  // 			</p>
  // 			<p className="text-justify">{post.body}</p>
  // 		</div>
  // 	</div>
  // );

  return (
    <>
      {isEditing ? (
        <NewPostForm
          INITIAL_DATA={initialData}
          add={edit}
          submit={submit}
          route={`/${post.id}`}
          id={postId}
          stateFunc={setIsEditing}
          newState={false}
        />
      ) : (
        <div className="PostDetails container w-50" style={{ position: "relative", top: "5em" }}>
          <div
            className="PostDetails-buttons float-right"
            style={{ position: "absolute", top: "0.5em", right: "0" }}
          >
            <i
              onClick={() => deletePost(postId)}
              className="fas fa-trash btn btn btn-link text-danger"
            />
            <i
              onClick={() => setIsEditing(true)}
              className="far fa-edit ml-1 btn btn btn-link text-primary"
            />
          </div>
          <div className="PostDetails-details">
            <h2>{post.title}</h2>
            <p>
              <i>{post.description}</i>
            </p>
            <p className="text-justify">{post.body}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetails;
