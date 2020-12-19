import React from "react";
import "moment/locale/id";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  TabPane,
  TabContent,
} from "reactstrap";
import Fade from "react-reveal/Fade";
import "./style.css";
import NumberFormat from "react-number-format";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getFetchCasesData, getFetchGraphData } from "../../redux/fetchDataAPI";

export default function WorldCase() {
  const globalData = useSelector(state => state)
  const dispatch = useDispatch();

  React.useEffect(() => {
    WorldCase();
    GraphCase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const WorldCase = (confirmed, recovered, death) => {
    dispatch(getFetchCasesData(confirmed, recovered, death))
  };

  const GraphCase = (confirmed, recovered, death, date) => {
    dispatch(getFetchGraphData(confirmed, recovered, death, date))
  };

  function LineChart() {
    const data = {
      labels: globalData.graphDate,
      datasets: [
        {
          label: "Confirmed",
          data: globalData.graphConfirmed,
          backgroundColor: "rgba(9, 132, 227,0.2)",
          borderColor: "rgba(9, 132, 227,0.2)",
          pointBorderColor: "rgba(9, 132, 227,0.2)",
          pointBackgroundColor: "rgba(9, 132, 227,0.2)",
        },
        {
          label: "Recovered",
          data: globalData.graphRecovered,
          backgroundColor: "rgba(76, 209, 55,0.2)",
          borderColor: "rgba(76, 209, 55,0.2)",
          pointBorderColor: "rgba(76, 209, 55,0.2)",
          pointBackgroundColor: "rgba(76, 209, 55,0.2)",
        },
        {
          label: "Death",
          data: globalData.graphDeath,
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

                <CardText style={{ color: "#4D6CFF", fontSize: 24, fontWeight: 600 }}>
                  <NumberFormat
                    value={globalData.casesConfirmed}
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
                <CardText style={{ color: "#67D3B3", fontSize: 24, fontWeight: 600 }}>
                  <NumberFormat
                    value={globalData.casesRecovered}
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
                <CardText style={{ color: "#EF7943", fontSize: 24, fontWeight: 600 }}>
                  <NumberFormat
                    value={globalData.casesDeath}
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
