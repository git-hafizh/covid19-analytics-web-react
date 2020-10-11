import React from "react";
import "moment/locale/id";
import { Card, CardBody, CardTitle, CardText, Row, Col } from "reactstrap";
import axios from "axios";
import Fade from "react-reveal/Fade";
import "./style.css";
import NumberFormat from "react-number-format";

export default function Menu() {
  const [docs, setDocs] = React.useState([
    {
      confirmed: 0,
      recovered: 0,
      death: 0,
    },
  ]);

  React.useEffect(() => {
    getDocsAPI();
  }, []);

  const CASEAPI = "https://covid19.mathdro.id/api";

  const getDocsAPI = async () => {
    await axios.get(CASEAPI).then((result) => {
      let case1 = result.data.confirmed.value;
      let case2 = result.data.deaths.value;
      let case3 = result.data.recovered.value;
      setDocs({
        confirmed: case1,
        death: case2,
        recovered: case3,
      });
    });
  };

  return (
    <div id="myBg" style={{ position: "relative", marginTop: "4rem"}}>
      <div>
        <span className="world-cases"
          style={{
            textAlign: "center",
            fontSize: 64,
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#95a5a6",
            position: "absolute",
            left: 0,
            right: 0,
            opacity: "30%",
            fontFamily: "rubik",
            top: -50,
          }}
        >
          World Cases
        </span>
      </div>
      <Fade bottom>
        <Row sm={5} style={{ justifyContent: "center" }}>
          <Col>
            <Card id="menu1">
              <CardBody>
                <CardTitle style={{ fontWeight: 600 }}>
                  Kasus Terkonfirmasi
                </CardTitle>

                <CardText
                  style={{ color: "#4D6CFF", fontSize: 24, fontWeight: 600 }}
                >
                  <NumberFormat
                    value={docs.confirmed}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  <span style={{ fontWeight: "normal" }}> Orang</span>
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Card id="menu2">
              <CardBody>
                <CardTitle style={{ fontWeight: 600 }}>
                  Orang yang Sembuh
                </CardTitle>
                <CardText
                  style={{ color: "#67D3B3", fontSize: 24, fontWeight: 600 }}
                >
                  <NumberFormat
                    value={docs.recovered}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  <span style={{ fontWeight: "normal" }}> Orang</span>
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Card id="menu3">
              <CardBody>
                <CardTitle style={{ fontWeight: 600 }}>
                  Orang yang Meninggal
                </CardTitle>
                <CardText
                  style={{ color: "#EF7943", fontSize: 24, fontWeight: 600 }}
                >
                  <NumberFormat
                    value={docs.death}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  <span style={{ fontWeight: "normal" }}> Orang</span>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fade>
      <div className="footer"></div>
    </div>
  );
}
