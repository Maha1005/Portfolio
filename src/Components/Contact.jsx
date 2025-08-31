import { useState } from "react";

function Contact() {

  const [ name, setName ] = useState('');
  const [email, setEmail] = useState('');
  const [description, setdes] = useState('');
  const apiUrl = "http://localhost:3000"
  const HandleSubmit = (e) => {
    e.preventDefault();
    fetch(apiUrl + "/contacts", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        username: name,
        email: email,
        description:description
      })
    }
    ).then((res) => {
      if (res.ok) {
        alert("Feedback saved successfully");
        }
      })
  }
  return (
    <div className="contact" style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h2>Contact</h2>
      <p>
        Thank you for visiting my portfolio! If you’d like to connect, collaborate, or discuss opportunities, feel free to reach out using any of the methods below.
      </p>

      <h3>📩 Get in Touch</h3>
      <p><strong>Email:</strong> <a href="mailto:maha@gmail.com">maha@gmail.com</a></p>
      <p><strong>Phone:</strong> +91 98765 43210</p>
      <p>
        <strong>LinkedIn:</strong>{" "}
        <a 
          href="https://www.linkedin.com/in/mahavarshni10?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Mahavarshni S
        </a>
      </p>
      <p>
        <strong>GitHub:</strong>{" "}
        <a 
          href="https://github.com/Maha1005" 
          target="_blank" 
          rel="noopener noreferrer"
        >
         Maha1005
        </a>
      </p>

      <h3>📝 Send me a message</h3>
      <form className="contact-form">
        <input className="input-box" type="text"
          value={name} placeholder="Your Name" onChange={(e) => 
         setName(e.target.value)
        }/>
        <input className="input-box" type="email" placeholder="Your Email" value={email } onChange={(e)=>setEmail(e.target.value)} />
        <textarea className="input-box" placeholder="Your Message" rows="5" onChange={(e)=>setdes(e.target.value)} value={description}></textarea>
        <button type="submit" className="contact-button" onClick={HandleSubmit}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
