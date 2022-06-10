import React from "react";
import logo from "../craftgram.png";
import { Card } from "react-bootstrap";

function HomePage() {
  return (
    <div className="landingPage">
      <br />
      <img src={logo} alt="craftgram logo" />
      <br />
      <br />
      <Card>
        <p>
          Welcome to <b>CraftGram</b>, your go to app for inspiration on your
          next Minecraft built.
        </p>
      </Card>
    </div>
  );
}

export default HomePage;
