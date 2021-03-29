import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import NewPostForm from "./NewPostForm";
import CommentList from "./CommentList";
import { useDispatch, useSelector } from "react-redux";

import { addCommentApi, deleteCommentApi, deletePostApi, editPostApi, getPostApi } from "../Actions/posts";
import CommentForm from "./CommentForm";
function PostDetails(props) {
  const postId = Number(useParams().postId);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const post = useSelector(st=>st.posts[postId])
  const history = useHistory()

  useEffect(()=>{
    async function getPost() {
      dispatch(getPostApi(postId))
    }
    if(!post){
      getPost()
    }
  }, [dispatch, post, postId])
  
  const toggleEdit = () => {
    setIsEditing(edit=>!edit)
  }

  const editPost = ({title, description, body}) => {
    dispatch(editPostApi(postId, title, description,body))
    toggleEdit()
  };

  const deletePost = ()=> {
    dispatch(deletePostApi(postId))
    history.push('/')
  }
  

  const addComment = comment => {
    dispatch(addCommentApi(postId, comment))
  };

  const deleteComment = commentId => {
    dispatch(deleteCommentApi(postId, commentId))
  };

  if(!post) return <b>Loading. . .</b>
  console.log(post)
  return (
    <>
      {isEditing ? (
        <NewPostForm post={post} cancel={toggleEdit} submit={editPost} />
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
              />
              <CommentForm addComment={addComment} /> 
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetails;
