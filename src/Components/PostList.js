import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./PostList.css";
import { useDispatch, useSelector } from "react-redux";
import { getPostsApi } from "../Actions/postList";

function PostList() {
  const titles = useSelector(st => st.postList)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    async function getAllTitles(){
      await dispatch(getPostsApi());
      setLoading(false)
    }
    if(loading){
      getAllTitles()
    }
  }, [dispatch, loading])

  if(loading) return <b>Loading. . .</b>
  if(!loading && titles.length === 0) return <h1>No posts yet!</h1>

  return (
    <Container fluid className="w-100">
      <div className="row justify-content-center">
        {titles.map(post => (
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
