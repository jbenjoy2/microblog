import React from "react";

function Comment({ id, content, deleteComment }) {
  return (
    <div className="Comment mb-3">
      
      <button onClick={() => deleteComment(id)} className="mr-3 btn btn-sm">
        ❌
      </button>
      
      <span>{content}</span>
    </div>
  );
}

export default Comment;
