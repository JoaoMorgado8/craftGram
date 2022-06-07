import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
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
          <h1>{project.name}</h1>
          <p>{project.category}</p>
          <img src={project.img} alt={project.name} />
        </>
      )}

      {filteredComments &&
        filteredComments.map((comment) => {
          return (
            <>
              <h3>{comment.author.username}</h3>
              <p>{comment.content}</p>
            </>
          );
        })}
      {project && (
        <Link to={`/projects/edit/${project._id}`}>
          <button>Edit Project</button>
        </Link>
      )}
    </div>
  );
}

export default ProjectDetailsPage;
