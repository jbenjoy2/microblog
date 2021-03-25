import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

function NewPostForm({
  add,
  submit,
  route,
  INITIAL_DATA = { title: "", description: "", body: "" },
  id = undefined,
  stateFunc = undefined,
  newState = undefined
}) {
  const history = useHistory();
  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    submit(e, add, formData, route, history, id, stateFunc, newState);
  };
  return (
    <div className="NewPostForm container col-md-5 offset-md-4">
      <h2>New Post</h2>
      <form onSubmit={handleSubmit} className="pb-3">
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formData.title}
            className="form-control"
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body: </label>
          <textarea
            name="body"
            id="body"
            onChange={handleChange}
            value={formData.body}
            className="form-control"
            rows={15}
          />
        </div>
        <button className="btn btn-lg btn-danger mr-3" onClick={() => history.push("/")}>
          Cancel
        </button>
        <button type="submit" className="btn btn-lg btn-success ml-3">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default NewPostForm;
