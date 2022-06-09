import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddProject from "../components/AddProject";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
function ProfilePage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setProjects(response.data.createdProjects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="ProjectListPage">
      {projects.map((project) => {
        return (
          <Card
            className="bg-light mx-auto"
            style={{ width: "20rem" }}
            key={project._id}
          >
            <Card.Body className="bg-light">
              <Link to={`/projects/${project._id}`}>
                <Card.Img variant="top" src={project.img} alt={project.name} />
              </Link>
            </Card.Body>
            <Card.Body>
              <Card.Title>{project.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{project.category}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Link to={`/projects/edit/${project._id}`}>
                <Button variant="dark">Edit Project</Button>
              </Link>
            </Card.Body>
          </Card>
        );
      })}
      <br />
      <AddProject refreshProjects={getAllProjects} />
    </div>
  );
}

export default ProfilePage;
