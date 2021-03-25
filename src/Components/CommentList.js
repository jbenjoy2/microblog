import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Comment from "./Comment";
import useLocalStorageState from "../hooks/useLocalStorage";

function CommentList({ post }) {
  const [comments, setComments] = useLocalStorageState(`post ${post.id}`, []);
  const [formData, setFormData] = useState({ content: "" });

  const addComment = comment => {
    setComments(comments => [...comments, { ...comment, id: uuid() }]);
  };

  const deleteComment = id => {
    setComments(comments => comments.filter(comment => comment.id !== id));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addComment(formData);
    setFormData({ content: "" });
  };
  return (
    <div className="CommentList">
      {comments.map(comment => (
        <Comment
          key={comment.id}
          id={comment.id}
          content={comment.content}
          deleteComment={deleteComment}
        />
      ))}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="content"
          id="content"
          value={formData.content}
          onChange={handleChange}
          className="form-control"
          placeholder="New comment..."
        />
        <button className="btn btn-lg btn-primary mt-3">Add Comment</button>
      </form>
    </div>
  );
}

export default CommentList;
