import { useEffect, useState } from "react";

function Skills() {
  const apiUrl = "http://localhost:3000";
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const role = localStorage.getItem("role");

  const getUser = () => {
    fetch(apiUrl + "/users/68aab2a80dcd78e463c867a2")
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setSkills(data.Skills || []);
      })
      .catch(err => console.error(err));
  };

  const updateSkills = () => {
    fetch(`${apiUrl}/users/${user._id}/skills`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Skills: skills }),
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setSkills(data.Skills || []);
        setIsEditing(false);
      })
      .catch(err => console.error(err));
  };

  const addSkill = () => setSkills([...skills, ""]);
  const removeSkill = i => setSkills(skills.filter((_, idx) => idx !== i));

  useEffect(() => { getUser(); }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="skills">
      <h1 className="skill-heading">Skills</h1>

      {isEditing ? (
        <div>
          {skills.map((skill, i) => (
            <div key={i}>
              <input
                value={skill}
                onChange={e => setSkills(skills.map((s, idx) => idx === i ? e.target.value : s))}
              />
              <button onClick={() => removeSkill(i)}>Delete</button>
            </div>
          ))}
          <button onClick={addSkill}>+ Add Skill</button>
          <br/>
          <button onClick={updateSkills}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <ul>
          {skills.map((skill, i) => <li key={i} className="skill-list">{skill}</li>)}
        </ul>
      )}

      {role === "admin" && !isEditing && (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  );
}

export default Skills;
