import { useEffect, useState } from "react";

function Projects() {
    
  const apiUrl = "http://localhost:3000"
  const [userData, setData] = useState([]);

  const getUsers = () => {
    try {
      fetch(apiUrl + "/users").then((res) => res.json()).then((data) => {
        setData(data);
        console.log(data)
        })
    } catch (err) {
      console.log("error"+err)
    }
  }


  useEffect(() => {
    getUsers();
  },[])

  return (
    <div className="projects" style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h2>Projects</h2>
      <ul>{userData.map((data,index) => (
        <div key={index}>
        {
          data.projects.map((project, index) => (
            <li key={index}>
            <strong>{project.projectTitle}</strong>
              <p>{project.projectDes}</p>
               </li>
          ))
        }
            </div>
       
      ))}
        
      </ul>
    </div>
  );
}

export default Projects;
