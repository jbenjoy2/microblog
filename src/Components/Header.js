import React from "react";
import { Jumbotron } from "reactstrap";

function Header() {
  return (
    <div>
      <Jumbotron fluid className="bg-dark text-center text-light">
        <h1 className="display-3">Microblog</h1>
        <p>
          Like a blog, but 1 x 10<sup>-6</sup> in size!
        </p>
      </Jumbotron>
    </div>
  );
}

export default Header;
