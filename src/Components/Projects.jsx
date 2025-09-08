import { useEffect, useState } from "react";

function Projects() {
  const apiUrl = "http://localhost:3000";
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const role = localStorage.getItem("role");

  const getUser = () => {
    fetch(apiUrl + "/users/68aab2a80dcd78e463c867a2")
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setProjects(data.projects || []);
      })
      .catch(err => console.error(err));
  };

  const updateProjects = () => {
    fetch(`${apiUrl}/users/${user._id}/projects`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects }),
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setProjects(data.projects || []);
        setIsEditing(false);
      })
      .catch(err => console.error(err));
  };

  const addProject = () => setProjects([...projects, { projectTitle: "", projectDes: "", Link: "" }]);
  const removeProject = i => setProjects(projects.filter((_, idx) => idx !== i));
  const updateProjectField = (i, field, value) => {
    const newProjects = [...projects];
    newProjects[i][field] = value;
    setProjects(newProjects);
  };

  useEffect(() => { getUser(); }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="projects">
      <h2>Projects</h2>

      {isEditing ? (
        <div>
          {projects.map((proj, i) => (
            <div key={i} className="project-item">
              <input
                placeholder="Project Title"
                value={proj.projectTitle}
                onChange={e => updateProjectField(i, "projectTitle", e.target.value)}
              />
              <input
                placeholder="Project Description"
                value={proj.projectDes}
                onChange={e => updateProjectField(i, "projectDes", e.target.value)}
              />
              <input
                placeholder="Link"
                value={proj.Link}
                onChange={e => updateProjectField(i, "Link", e.target.value)}
              />
              <button onClick={() => removeProject(i)}>Delete</button>
            </div>
          ))}
          <button onClick={addProject}>+ Add Project</button>
          <br />
          <button onClick={updateProjects}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <ul>
          {projects.map((proj, i) => (
            <li key={i} className="project-item">
              <strong>{proj.projectTitle}</strong>
              <p>{proj.projectDes}</p>
              <a href={proj.Link} target="_blank">{proj.Link}</a>
            </li>
          ))}
        </ul>
      )}

      {role === "admin" && !isEditing && (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  );
}

export default Projects;
