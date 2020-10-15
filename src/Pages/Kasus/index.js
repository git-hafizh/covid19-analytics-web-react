import React from "react";
import "moment/locale/id";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  NavItem,
  Nav,
  NavLink,
  TabPane,
  TabContent,
} from "reactstrap";
import axios from "axios";
import Fade from "react-reveal/Fade";
import "./style.css";
import NumberFormat from "react-number-format";
import { Line } from "react-chartjs-2";

export default function Menu() {
  const [docs, setDocs] = React.useState([
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
      date: 0,
    },
  ]);

  React.useEffect(() => {
    getDocsAPI();
    IDCase();
  }, []);

  const IDCase = () => {
    axios
      .get("https://indonesia-covid-19.mathdro.id/api/harian")
      .then((result) => {
        let data = result.data.data;
        let confirmed = [];
        let recovered = [];
        let death = [];
        let date = [];
        data.forEach((item) => {
          confirmed.push(item.jumlahKasusBaruperHari);
          recovered.push(item.jumlahKasusSembuhperHari);
          death.push(item.jumlahKasusMeninggalperHari);

          //date convert
          const elDate = new Date(item.tanggal).toLocaleDateString("ID");
          const stringToDate = function (dateString) {
            const [dd, mm, yyyy] = dateString.split("/");
            return new Date(`${yyyy}-${mm}-${dd}`);
          };
          const convertDate = stringToDate(elDate).toString().split(" ");
          let dateArr = convertDate,
            removeDateFromIndex = [0, 4, 5, 6, 7, 8];

          for (var i = removeDateFromIndex.length - 1; i >= 0; i--)
            dateArr.splice(removeDateFromIndex[i], 1);

          let arr = dateArr[1];
          dateArr[1] = dateArr[0];
          dateArr[0] = arr;

          let dateCase = dateArr.join(" ");

          date.push(dateCase);
        });

        setRecord({
          confirmed: confirmed,
          recovered: recovered,
          death: death,
          date: date,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function LineChart() {
    const data = {
      labels: record.date,
      datasets: [
        {
          label: "Confirmed",
          data: record.confirmed,
          backgroundColor: "rgba(9, 132, 227,0.2)",
          borderColor: "rgba(9, 132, 227,0.2)",
          pointBorderColor: "rgba(9, 132, 227,0.2)",
          pointBackgroundColor: "rgba(9, 132, 227,0.2)",
        },
        {
          label: "Recovered",
          data: record.recovered,
          backgroundColor: "rgba(76, 209, 55,0.2)",
          borderColor: "rgba(76, 209, 55,0.2)",
          pointBorderColor: "rgba(76, 209, 55,0.2)",
          pointBackgroundColor: "rgba(76, 209, 55,0.2)",
        },
        {
          label: "Death",
          data: record.death,
          backgroundColor: "rgba(214, 48, 49,0.2)",
          borderColor: "rgba(214, 48, 49,0.2)",
          pointBorderColor: "rgba(214, 48, 49,0.2)",
          pointBackgroundColor: "rgba(214, 48, 49,0.2)",
        },
      ],
    };

    const options = {
      maintainAspectRatio: false	// Don't maintain w/h ratio
    }


    return <Line data={data} options={options} />;
  }

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
    <div id="myBg" style={{ position: "relative", marginTop: "4rem" }}>
      <div className="world">
        <span className="world-cases">
          World Cases
        </span>
      </div>
      <Fade bottom>
        <Row sm={5} style={{ justifyContent: "center" }}>
          <Col>
            <Card id="menu1">
              <CardBody>
                <CardTitle style={{ fontWeight: 600 }}>Confirmed</CardTitle>

                <CardText
                  style={{ color: "#4D6CFF", fontSize: 24, fontWeight: 600 }}
                >
                  <NumberFormat
                    value={docs.confirmed}
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
                <CardTitle style={{ fontWeight: 600 }}>Recovered</CardTitle>
                <CardText
                  style={{ color: "#67D3B3", fontSize: 24, fontWeight: 600 }}
                >
                  <NumberFormat
                    value={docs.recovered}
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
                <CardTitle style={{ fontWeight: 600 }}>Death</CardTitle>
                <CardText
                  style={{ color: "#EF7943", fontSize: 24, fontWeight: 600 }}
                >
                  <NumberFormat
                    value={docs.death}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  <span style={{ fontWeight: "normal" }}> People</span>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fade>
      <div>
        <span className="ina-cases">
          Indonesia Cases
        </span>
      </div>
      <div
        className="chart-cases"
        style={{
          justifyContent: "center",
          margin: "6rem auto 0 auto",
        }}
      >
        <TabContent>
          <TabPane>
            <LineChart />
          </TabPane>
        </TabContent>
      </div>
      <div className="footer"></div>
    </div>
  );
}
