import React, { useState } from "react";

function CommentForm({ addComment }) {
  const [formData, setFormData] = useState('');

  const handleChange = e => {
    setFormData(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addComment(formData);
    setFormData("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange}
            id="comment"
            name="comment"
            placeholder="New comment..."
            className="form-control"
            value={formData}
          />
        </div>
        <button className='btn btn-block btn-success'>Add</button>
      </form>
    </div>
  );
}

export default CommentForm;
