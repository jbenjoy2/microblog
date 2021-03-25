import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import NewPostForm from "./NewPostForm";
import Comment from "./Comment";
import { v4 as uuid } from "uuid";
import CommentList from "./CommentList";
import { useDispatch } from "react-redux";
import { EDIT_POST, REMOVE_POST, ADD_COMMENT, REMOVE_COMMENT } from "../Actions/actionTypes";
function PostDetails({ posts }) {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const post = posts[postId];
  if (!post) return <Redirect to="/" />;
  const initialData = { ...post };

  const editPost = postObj => {
    setIsEditing(false);
    dispatch({
      type: EDIT_POST,
      post: { ...postObj, id: postId }
    });
  };

  const deletePost = postId => {
    dispatch({
      type: REMOVE_POST,
      postId
    });
  };

  const addComment = comment => {
    dispatch({
      type: ADD_COMMENT,
      postId,
      comment: { ...comment, id: uuid() }
    });
  };

  const deleteComment = commentId => {
    dispatch({
      type: REMOVE_COMMENT,
      postId,
      commentId
    });
  };
  return (
    <>
      {isEditing ? (
        <NewPostForm INITIAL_DATA={initialData} submit={editPost} destination={`/${postId}`} />
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
              <CommentList
                comments={post.comments}
                deleteComment={deleteComment}
                addComment={addComment}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetails;
