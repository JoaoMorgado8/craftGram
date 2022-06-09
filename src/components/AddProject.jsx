import React, { useState } from "react";
//import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button, InputGroup, FormControl } from "react-bootstrap";

function AddProject(props) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");

  //const { projectId } = useParams();

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    const getToken = localStorage.getItem("authToken");
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("img", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/upload`, uploadData, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setImg(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleName = (e) => setName(e.target.value);
  //const handleImg = (e) => setImg(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { name, img, category };
    const getToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/projects`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(() => {
        setName("");
        setImg("");
        setCategory("");

        props.refreshProjects();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card className="mx-auto" style={{ width: "20rem" }}>
        <Card.Header>Add Project</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="name">Build Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="category">Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={category}
                onChange={handleCategory}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label htmlFor="img">Screenshot</Form.Label>
              <Form.Control
                type="file"
                name="img"
                onChange={handleFileUpload}
              />
            </Form.Group>

            <Button style={{ width: "18rem" }} variant="dark" type="submit">
              Add Project
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default AddProject;
