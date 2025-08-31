import { useEffect, useState } from "react";

function Skills() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch("http://localhost:3000/users").then((res) => res.json()).then((data) => setData(data));
  }

  useEffect(() => {
    getData();
  },[])
  return (
    <div className="skills">
      <h1 className="skill-heading">Skills</h1>
      <ul>
        {data.map((datum, index) => (
          datum.Skills?.map((Content, index) => (
            <li key={index} className="skill-list">
               {Content}
           </li>
          ))
        ))}
      </ul>
    </div>
  );
}

export default Skills;