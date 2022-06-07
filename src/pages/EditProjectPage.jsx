import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProjectPage() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");

  const { projectId } = useParams();
  const navigate = useNavigate();

  const getToken = localStorage.getItem("authToken");

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

  useEffect(() => {
    //getProject();
  }, []);

  const handleName = (e) => setName(e.target.value);
  const handleImg = (e) => setImg(e.target.value);
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
      <h3>Edit the Project</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Title</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={handleCategory}
        />

        <label htmlFor="img">Screenshot</label>
        <input type="file" name="img" value={img} onChange={handleImg} />

        <button type="submit">Edit</button>
      </form>
      <button onClick={deleteProject}>Delete</button>
    </div>
  );
}

export default EditProjectPage;
