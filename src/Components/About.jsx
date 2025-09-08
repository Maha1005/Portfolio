import { useState, useEffect } from "react";

function About() {
  const apiUrl = "http://localhost:3000";
  const [abt, setAbt] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newAbout, setNewAbout] = useState("");
  const role = localStorage.getItem("role"); 

  const getUser = () => {
    fetch(apiUrl + "/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setAbt(data[0]);      
          setNewAbout(data[0].about);
        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  };

  const updateAbout = () => {
    fetch(apiUrl + "/users/" + abt._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ about: newAbout }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAbt(data);
        setIsEditing(false);
      })
      .catch((err) => console.error("Error updating about:", err));
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!abt) {
    return <p>Loading...</p>;
  }

  return (
    <div className="about">
      <h2 className="about-h2">About Me</h2>
      <div className="about-list">
        {isEditing ? (
          <div>
            <textarea
              value={newAbout}
              onChange={(e) => setNewAbout(e.target.value)}
              rows="4"
              cols="50"
            />
            <br />
            <button className="save-btn" onClick={updateAbout}>
              Save
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setIsEditing(false);
                setNewAbout(abt.about); // reset text if cancelled
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <p>{abt.about}</p>
        )}

        {/* Only one Edit button when not editing */}
        {role === "admin" && !isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default About;
