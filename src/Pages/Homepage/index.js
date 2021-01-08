import React from "react";
import { Jumbotron, Button, Row, Col } from "reactstrap";
import Gambar from "../../../src/assets/covid-illustration/covid-landingpage.svg";
import "../../Pages/style.css";

export default function Homepage() {
  return (
    <div id="homepage">
      <Row>
        <Col sm={6}>
          <Jumbotron style={{ background: "#F7FAFC" }}>
            <h1 className="display-5" style={{ color: "#122544" }}>
              Tetap Produktif Berkarya dan Belajar{" "}
              <span style={{ color: "#c62026" }}>#dirumahaja</span>
            </h1>
            <div className="header-bg-toggle">
              <img alt="" style={{ marginTop: 75, width: "85%" }} src={Gambar} />
            </div>
            <p className="lead">
              Virus Corona atau severe acute respiratory syndrome coronavirus 2
              (SARS-CoV-2) adalah virus yang menyerang sistem pernapasan.
              Penyakit karena infeksi virus ini disebut COVID-19. Virus Corona
              bisa menyebabkan gangguan ringan pada sistem pernapasan, infeksi
              paru-paru yang berat, hingga kematian.
            </p>
            <hr className="my-2" />
            <p className="caption">
              Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) yang
              lebih dikenal dengan nama virus Corona adalah jenis baru dari
              coronavirus yang menular ke manusia.
            </p>
            <p className="lead">
              <Button color="primary" href="#myBg">
                Data Kasus
              </Button>
            </p>
          </Jumbotron>
        </Col>
        <Col className="header-bg" sm={6}>
          <img alt="" style={{ marginTop: 75, width: "85%" }} src={Gambar} />
        </Col>
      </Row>
    </div>
  );
}
