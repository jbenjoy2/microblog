import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import NewPostForm from "./NewPostForm";
import Comment from "./Comment";
import { v4 as uuid } from "uuid";
import CommentList from "./CommentList";
function PostDetails({ posts, setPosts, edit, submit, deletePost }) {
  const { postId } = useParams();
  const [formData, setFormData] = useState({ comment: "" });
  const [isEditing, setIsEditing] = useState(false);
  const post = posts.find(post => post.id === postId);
  if (!post) return <Redirect to="/" />;
  const initialData = { ...post };

  const addComment = comment => {
    post.comments = [...post.comments, { content: comment, id: uuid() }];
  };

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
          <hr className="mt-5" />
          <div className="PostDetails-comments">
            <h2>Comments</h2>
            <div className="mb-4">
              <CommentList post={post} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetails;
