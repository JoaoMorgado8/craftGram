import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Stack,
  Form,
  Button,
} from "react-bootstrap";
const filteredComments = [];

function ProjectDetailsPage() {
  const [project, setProject] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const { projectId } = useParams();

  const getProject = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComments = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/comments`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setAllComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${projectId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    getProject();
    getAllComments();
  }, []);

  const filterCommentsFunction = () => {
    project.comments.forEach((commentFromProject) => {
      allComments.forEach((commentFromAll) => {
        if (commentFromProject._id === commentFromAll._id) {
          filteredComments.push(commentFromAll);
        }
      });
    });
  };

  if (project && allComments && filteredComments.length === 0) {
    filterCommentsFunction();
  } else if (project && allComments && filteredComments.length !== 0) {
    filteredComments.splice(0, filteredComments.length);
    filterCommentsFunction();
  }

  return (
    <div className="ProjectDetailsPage">
      {project && (
        <>
          <Card style={{ width: "24rem" }} key={project._id}>
            <Card.Body>
              <Link to={`/projects/${project._id}`}>
                <Card.Img variant="top" src={project.img} alt={project.name} />
              </Link>
            </Card.Body>

            <Card.Body>
              <Card.Title>{project.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Category: {project.category}</ListGroupItem>
            </ListGroup>
          </Card>
        </>
      )}

      {filteredComments &&
        filteredComments.map((comment) => {
          return (
            <>
              <ListGroup>
                <ListGroupItem>
                  {comment.author.username} says: {comment.content}
                </ListGroupItem>
              </ListGroup>
            </>
          );
        })}

      <Stack direction="horizontal" gap={3}>
        <Form.Control className="me-auto" placeholder="Comment here..." />
        <Button variant="dark">Submit</Button>
      </Stack>
    </div>
  );
}

export default ProjectDetailsPage;
