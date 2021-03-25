import React from "react";
import { Card, CardBody, CardTitle, CardText, Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./PostList.css";

function PostList({ posts }) {
  return (
    <Container fluid className="w-100">
      <div className="row justify-content-center">
        {posts.map(post => (
          <Card key={post.id} className="col-12 col-sm-4 PostList-card mx-5 my-2">
            <CardBody>
              <CardTitle>
                <Link to={`/${post.id}`}>{post.title}</Link>
              </CardTitle>
              <CardText>{post.description}</CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default PostList;
