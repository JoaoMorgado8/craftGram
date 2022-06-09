import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [content, setContent] = useState("");
  const { projectId } = useParams();

  const navigate = useNavigate();

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

  const handleComment = (e) => setContent(e.target.value);

  const createComment = () => {
    const body = { content };
    const getToken = localStorage.getItem("authToken");
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${projectId}/comments`,
        body,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then(() => {
        setContent("");
        navigate(`/projects/${projectId}`);
      })
      .catch((err) => {
        console.error(err);
        // setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <div className="ProjectDetailsPage">
      {project && (
        <>
          <Card
            className="mx-auto"
            style={{ width: "20rem" }}
            key={project._id}
          >
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
          <br />
        </>
      )}

      {filteredComments &&
        filteredComments.map((comment) => {
          return (
            <>
              <Card className="mx-auto" style={{ width: "20rem" }}>
                <ListGroup>
                  <ListGroupItem>
                    {comment.author.username} says: {comment.content}
                  </ListGroupItem>
                </ListGroup>
              </Card>
              <br />
            </>
          );
        })}

      <Card className="mx-auto" style={{ width: "20rem" }}>
        <Stack direction="horizontal" gap={3}>
          <Form variant="dark" type="submit">
            <Form.Group
              type="text"
              name="comment"
              value={content}
              onChange={handleComment}
            >
              <Form.Control className="me-auto" placeholder="Comment here..." />
            </Form.Group>
            <Button
              variant="dark"
              style={{ width: "20rem" }}
              onClick={createComment}
            >
              Submit
            </Button>
          </Form>
        </Stack>
      </Card>
    </div>
  );
}

export default ProjectDetailsPage;
