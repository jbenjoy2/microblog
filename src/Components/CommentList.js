import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Comment from "./Comment";

function CommentList({ comments = [], deleteComment, addComment }) {
  
  return (
    <div className="CommentList">
      {comments.map(comment => (
        <Comment
          key={comment.id}
          id={comment.id}
          content={comment.text}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
}

export default CommentList;
