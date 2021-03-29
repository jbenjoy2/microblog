import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import NewPostForm from "./NewPostForm";
import CommentList from "./CommentList";
import { useDispatch, useSelector } from "react-redux";

import {
  addCommentApi,
  addVoteApi,
  deleteCommentApi,
  deletePostApi,
  editPostApi,
  getPostApi
} from "../Actions/posts";
import CommentForm from "./CommentForm";
import "./PostDetails.css";
function PostDetails(props) {
  const postId = Number(useParams().postId);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const post = useSelector(st => st.posts[postId]);
  const history = useHistory();

  useEffect(() => {
    async function getPost() {
      dispatch(getPostApi(postId));
    }
    if (!post) {
      getPost();
    }
  }, [dispatch, post, postId]);

  const toggleEdit = () => {
    setIsEditing(edit => !edit);
  };

  const editPost = ({ title, description, body }) => {
    dispatch(editPostApi(postId, title, description, body));
    toggleEdit();
  };

  const deletePost = () => {
    dispatch(deletePostApi(postId));
    history.push("/");
  };

  const addComment = comment => {
    dispatch(addCommentApi(postId, comment));
  };

  const deleteComment = commentId => {
    dispatch(deleteCommentApi(postId, commentId));
  };

  const addVote = (postId, direction) => {
    dispatch(addVoteApi(postId, direction));
  };

  if (!post) return <b>Loading. . .</b>;
  console.log(post);
  return (
    <>
      {isEditing ? (
        <NewPostForm post={post} cancel={toggleEdit} submit={editPost} />
      ) : (
        <div className="PostDetails container w-50" style={{ position: "relative" }}>
          <div className="PostDetails-details mb-5">
            <h2>{post.title}</h2>
            <p>
              <i>{post.description}</i>
            </p>
            <p className="text-justify">{post.body}</p>
          </div>
          <div className="Postdetails-buttons">
            <div className="PostDetails-edit">
              <i onClick={() => deletePost(postId)} className="fas fa-trash text-danger" />
              <i onClick={() => setIsEditing(true)} className="far fa-edit text-primary" />
            </div>
            <div className="PostDetails-vote">
              <b className={`${post.votes > 0 ? "text-success" : "text-danger"}`}>{post.votes}</b>
              <i
                onClick={() => addVote(postId, "down")}
                className="fas fa-thumbs-down text-danger"
              />
              <i onClick={() => addVote(postId, "up")} className="fas fa-thumbs-up text-success" />
            </div>
          </div>

          <hr className="mt-5" />
          <div className="PostDetails-comments mt-4">
            <h2>Comments</h2>
            <div className="mb-4">
              <CommentList comments={post.comments} deleteComment={deleteComment} />
              <CommentForm addComment={addComment} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetails;
