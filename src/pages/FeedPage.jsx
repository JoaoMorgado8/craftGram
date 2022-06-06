import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import AddProject from "../components/AddProject";

function FeedPage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setProjects(response.data);
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
          <div key={project._id} className="ProjectCard card">
            <Link to={`/projects/${project._id}`}>
              <h3>{project.name}</h3>
              <p>{project.category}</p>
              <img src={project.img} alt={project.name} />
              <p>{project.comment}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default FeedPage;
