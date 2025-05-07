import React from "react";
import ContainerType1 from "../../component/ContainerType1";

function About() {
  return (
    <div className="container overflow-auto" style={{ color: "var(--pallette-3)" }}>

      <ContainerType1>
        <h1>About</h1>
      </ContainerType1>

      <ContainerType1>
        <p style={{ color: "var(--pallette-3)" }}>
          Hi! I'm Dolfo. I'm a software engineer at TechnoPro Engineering.
          Currently dispatched at Nissan Automotive. Right now, I am in charge
          of improving our workflows and creating tools and applications to
          improve efficiency. In my spare time, Im studying web development
          which I found interesting. Its a blend of logic and creativity which I
          really enjoy.
        </p>
        <p style={{ color: "var(--pallette-3)" }}>
          Education Finished <strong>B.S Computer Engineering</strong> at University of the East
          (Philippines) (June 2006 ~ March 2012)
        </p>
      </ContainerType1>
      
    </div>
  );
}
export default About;
