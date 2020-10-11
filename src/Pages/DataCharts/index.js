import React from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import "./style.css";
import moment from "moment";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Input,
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
  const [onTab, setOnTab] = React.useState("1");
  const [cases, setCases] = React.useState([
    {
      confirmed: 0,
      recovered: 0,
      death: 0,
    },
  ]);
  const [record, setRecord] = React.useState([
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

    axios
      .get("https://covid19.mathdro.id/api/countries/USA/confirmed")
      .then((result) => {
        console.log(result);
        let data = result.data;
        let confirmed = [];
        let recovered = [];
        let death = [];
        data.forEach((item) => {
          confirmed.push(item.confirmed);
          recovered.push(item.recovered);
          death.push(item.deaths);
        });

        //reverse the array
        let revConfirmed = confirmed.reverse();
        let revRecovered = recovered.reverse();
        let revDeath = death.reverse();

        setRecord({
          confirmed: revConfirmed,
          recovered: revRecovered,
          death: revDeath,
        });
      })
      .catch((err) => {
        console.log(err);
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

  console.log(record.confirmed);

  function LineChart() {
    const data = {
      labels: "",
      datasets: [
        {
          labels: "Confirmed",
          data: record.confirmed,
          backgroundColor: "rgba(0, 184, 148,0.2)",
          borderColor: "rgba(0, 184, 148,0.2)",
          pointBorderColor: "rgba(0, 184, 148,0.2)",
          pointBackgroundColor: "rgba(0, 184, 148,0.2)",
        },
        {
          labels: "Recovered",
          data: record.recovered,
          backgroundColor: "rgba(9, 132, 227,0.2)",
          borderColor: "rgba(9, 132, 227,0.2)",
          pointBorderColor: "rgba(9, 132, 227,0.2)",
          pointBackgroundColor: "rgba(9, 132, 227,0.2)",
        },
        {
          labels: "Death",
          data: record.death,
          backgroundColor: "rgba(214, 48, 49,0.2)",
          borderColor: "rgba(214, 48, 49,0.2)",
          pointBorderColor: "rgba(214, 48, 49,0.2)",
          pointBackgroundColor: "rgba(214, 48, 49,0.2)",
        },
      ],
    };

    return <Line data={data} />;
  }

  return (
    <>
      <div className="data" style={{ position: "relative", top: "-4rem" }}>
        <span
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
            top: 20,
          }}
        >
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
                    Kasus Terkonfirmasi
                  </CardTitle>

                  <CardText
                    style={{ color: "#4D6CFF", fontSize: 18, fontWeight: 600 }}
                  >
                    <NumberFormat
                      value={cases.confirmed}
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
                    style={{ color: "#67D3B3", fontSize: 18, fontWeight: 600 }}
                  >
                    <NumberFormat
                      value={cases.recovered}
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
                    style={{ color: "#EF7943", fontSize: 18, fontWeight: 600 }}
                  >
                    <NumberFormat
                      value={cases.death}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    <span style={{ fontWeight: "normal" }}> Orang</span>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        {/* <div
        style={{ width: "65%", justifyContent: "center", margin: "2rem auto" }}
      >
        <Nav tabs>
          <NavItem style={{ cursor: "pointer" }}>
            <NavLink active={onTab === "1"} onClick={() => setOnTab("1")}>
              Grafik
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={onTab}>
          <TabPane tabId="1">
            <LineChart/>
          </TabPane>
        </TabContent>
      </div> */}
      </div>
    </>
  );
}
