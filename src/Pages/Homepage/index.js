import React from "react";
import { Jumbotron, Button, Row, Col } from "reactstrap";
import Gambar from "../../../src/assets/covid-illustration/covid-landingpage.svg";
import "../../Pages/style.css";

export default function Homepage() {
  return (
    <div id="homepage">
      <Row sm={12}>
        <Col sm={6}>
          <Jumbotron style={{ background: "#F7FAFC" }}>
            <h1 className="display-5" style={{ color: "#122544" }}>
              Tetap Produktif Berkarya dan Belajar{" "}
              <span style={{ color: "#c62026" }}>#dirumahaja</span>
            </h1>
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              consectetur, magna at feugiat aliquet, justo nisi laoreet dui, sed
              venenatis purus neque non tortor. Fusce ultricies eleifend lorem,
              vitae vestibulum tortor scelerisque non. Morbi bibendum eros ac
              odio fermentum, at finibus turpis imperdiet.
            </p>
            <hr className="my-2" />
            <p>
            Interdum arcu iaculis. Curabitur tempor
            tortor nec dolor commodo semper. Nulla blandit accumsan volutpat.
            Orci varius natoque penatibus et magnis dis parturient montes.
            </p>
            <p className="lead">
              <Button color="primary" href="#myBg">
                Data Kasus
              </Button>
            </p>
          </Jumbotron>
        </Col>
        <Col sm={6}>
          <img style={{ marginTop: 75, width: "85%" }} src={Gambar} />
        </Col>
      </Row>
    </div>
  );
}
