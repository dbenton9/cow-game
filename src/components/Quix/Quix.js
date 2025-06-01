import React from "react";
import Container from "react-bootstrap/Container";
import ScoreBoard from "./ScoreBoard";

function QuixPage() {
    return (
      <Container>
        <h1>Quix Score Card</h1>
        <ScoreBoard/>
      </Container>
    );
}
export default QuixPage;