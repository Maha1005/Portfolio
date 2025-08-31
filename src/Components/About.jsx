import { useState,useEffect } from "react";

function About() {
  const apiUrl = "http://localhost:3000"
  const [abt, setabt] = useState([]);
  const getUsers = () => {
    fetch(apiUrl + "/users").then((res) => res.json()).then((data) =>
      setabt(data))
  }
  useEffect(() => {
    getUsers();
  },[])
  return (
    <div className="about">
      <h2 className="about-h2">About Me</h2>
      {abt.map((data, index) => (
         <p key={index} className="about-list">{data.about}
      </p>
      ))}
      
    </div>
  );
}

export default About;