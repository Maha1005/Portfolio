function Contact() {
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
      <form style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
        <input type="text" placeholder="Your Name" style={{ padding: "0.7rem", borderRadius: "8px", border: "1px solid #ccc" }} />
        <input type="email" placeholder="Your Email" style={{ padding: "0.7rem", borderRadius: "8px", border: "1px solid #ccc" }} />
        <textarea placeholder="Your Message" rows="5" style={{ padding: "0.7rem", borderRadius: "8px", border: "1px solid #ccc" }}></textarea>
        <button type="submit" style={{ padding: "0.8rem", background: "#0077cc", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
