import React from "react";
import axios from "axios";
import "./style.css";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import "../../Pages/style.css";
import SearchCountry from "./SearchCountry";
import NumberFormat from "react-number-format";

export default function DataCharts() {
  const [cases, setCases] = React.useState([
    {
      confirmed: 0,
      recovered: 0,
      death: 0,
    },
  ]);
 
  const [selected, setSelected] = React.useState("Indonesia");
  const [country, setCountry] = React.useState([]);

  React.useEffect(() => {
    getCountryAPI();
    pickCountry();
  }, [selected]);

  const getCountryAPI = () => {
    axios.get("https://covid19.mathdro.id/api/countries").then((result) => {
      let datas = result.data.countries;
      let name = [];
      datas.forEach((record) => {
        name.push(record.name);
      });
      setCountry(name);
    });
  };

  const pickCountry = () => {
    let nationID = selected;
    axios
      .get(`https://covid19.mathdro.id/api/countries/${nationID}`)
      .then((result) => {
        let confirmed = result.data.confirmed.value;
        let recovered = result.data.recovered.value;
        let death = result.data.deaths.value;

        setCases({
          confirmed: confirmed,
          recovered: recovered,
          death: death,
        });
      });
  };

  function handleChange(value) {
    setSelected(value);
    pickCountry(selected);
  }

  return (
    <>
      <div className="data" style={{ position: "relative", top: "-4rem" }}>
        <span className="country">
          Country Cases
        </span>
        <div
          style={{
            width: "30%",
            justifyContent: "center",
            margin: "2rem auto",
          }}
        >
          <SearchCountry
            country={country}
            selected={selected}
            handleChange={(e) => handleChange(e)}
          />
        </div>
        <div style={{ marginBottom: "5rem" }}>
          <Row className="cases" sm={5} style={{ justifyContent: "center" }}>
            <Col>
              <Card id="menu1">
                <CardBody>
                  <CardTitle style={{ fontWeight: 600 }}>
                    Confirmed
                  </CardTitle>

                  <CardText
                    style={{ color: "#4D6CFF", fontSize: 18, fontWeight: 600 }}
                  >
                    <NumberFormat
                      value={cases.confirmed}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    <span style={{ fontWeight: "normal" }}> People</span>
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col>
              <Card id="menu2">
                <CardBody>
                  <CardTitle style={{ fontWeight: 600 }}>
                    Recovered
                  </CardTitle>
                  <CardText
                    style={{ color: "#67D3B3", fontSize: 18, fontWeight: 600 }}
                  >
                    <NumberFormat
                      value={cases.recovered}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    <span style={{ fontWeight: "normal" }}> People</span>
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col>
              <Card id="menu3">
                <CardBody>
                  <CardTitle style={{ fontWeight: 600 }}>
                    Death
                  </CardTitle>
                  <CardText
                    style={{ color: "#EF7943", fontSize: 18, fontWeight: 600 }}
                  >
                    <NumberFormat
                      value={cases.death}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    <span style={{ fontWeight: "normal" }}> People</span>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
