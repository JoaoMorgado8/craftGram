import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

function EditProjectPage() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");

  const { projectId } = useParams();
  const navigate = useNavigate();

  const getToken = localStorage.getItem("authToken");

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

  /*   const getProject = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setName(response.data.name);
      setImg(response.data.img);
      setCategory(response.data.category);
    } catch (error) {
      console.log(error);
    }
  }; */

  const deleteProject = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      navigate("/feedPage");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  const handleName = (e) => setName(e.target.value);
  // const handleImg = (e) => setImg(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { name, category };
    const getToken = localStorage.getItem("authToken");
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${projectId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then(() => {
        setName("");
        setImg("");
        setCategory("");
        navigate(`/projects/${projectId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProjectPage">
      <Card>
        <Card.Header>Edit the Project</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="name">Title</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleName}
              />
            </Form.Group>
            <Form.Group>
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
                value={img}
                onChange={handleFileUpload}
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Edit
            </Button>
          </Form>
          <Button variant="danger" onClick={deleteProject}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EditProjectPage;
