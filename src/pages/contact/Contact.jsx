import React from "react";
import ContainerType1 from "../../component/ContainerType1";

function Contact() {
  return (
    <div className="container overflow-auto" style={{ color: "var(--pallette-3)" }} >
      <ContainerType1>
        <h1>Contacts</h1>
      </ContainerType1>

      <ContainerType1>
        <p>
          <i className="bi bi-envelope me-2"></i>
          <a href="mailto:delafuente.rodolfo4@gmail.com" target="_blank" rel="noopener noreferrer" >
            delafuente.rodolfo4@gmail.com
          </a>
        </p>
        <p>
          <i className="bi bi-linkedin me-2"></i>
          <a href="https://www.linkedin.com/in/rodolfo-iv-dela-fuente-8aabb8244" target="_blank" rel="noopener noreferrer" >
            LinkedIn
          </a>
        </p>
        <p>
          <i className="bi bi-github me-2"></i>
          <a href="https://github.com/r4df" rel="noopener noreferrer" target="_blank" >
            GitHub
          </a>
        </p>
      </ContainerType1>


    </div>
  );
}
export default Contact;
