import React from "react";
import "moment/locale/id";
import { Card, CardBody, CardTitle, CardText, Row, Col } from "reactstrap";
import axios from "axios";
import Moment from "react-moment";
import Fade from "react-reveal/Fade";
import ScrollAnimation from "react-animate-on-scroll";
import '../../Pages/style.css';

export default function Menu() {
  const [kasus, setKasus] = React.useState([]);
  const [datas, setDatas] = React.useState([]);

  React.useEffect(() => {
    getKasusAPI();
    getDataAPI();
  }, []);

  const getKasusAPI = () => {
    axios.get("https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/indonesia")
      .then((result) => {
        setKasus(result.data[0]);
      });
  };

  const getDataAPI = () => {
    axios.get("https://api.covid19api.com/summary")
    .then((result) => {
      setDatas(result.data.Countries[77])
    })
  }

  return (
    <div id="myBg" style={{position: "relative", top: -40}}>
      <div>
      <span style={{
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
        // writingMode: "vertical-rl",
        // textOrientation: "upright"
      }}>Cases</span>
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
                  {kasus.positif} <span style={{fontWeight: "normal"}}>Orang</span>
                </CardText>
                <p>
                  Kasus Terkonfirmasi <br />
                  Hari Ini : <b>{datas.NewConfirmed} </b>Kasus
                </p>
                {/* <p>
                  Merupakan gabungan dari kasus yang <i>dikonfirmasi</i>,{" "}
                  <i>telah pulih</i>, dan <i>meninggal</i>
                </p> */}
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
                  {kasus.sembuh} <span style={{fontWeight: "normal"}}>Orang</span>
                </CardText>
                <p>
                  Sembuh Hari Ini : <br/><b>{datas.NewRecovered} </b>Orang
                </p>
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
                  {kasus.meninggal} <span style={{fontWeight: "normal"}}>Orang</span>
                </CardText>
                <p>
                  Meninggal Hari Ini: <br/><b>{datas.NewDeaths} </b>Orang
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Card id="menu4">
              <CardBody>
                <CardTitle style={{ fontWeight: 600 }}>
                  Dalam Masa Perawatan
                </CardTitle>
                <CardText
                  style={{ color: "#FECC65", fontSize: 24, fontWeight: 600 }}
                >
                  {kasus.dirawat} <span style={{fontWeight: "normal"}}>Orang</span>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <div style={{margin: "20px 138px 0px 138px", textAlign: "right"}}>
          <span>Terakhir diperbarui pada: 
            <Moment locale="id" format="D MMM YYYY" date={kasus.Date} />
            
            <b> 
              <Moment format=" H:mm:ss" /> WIB
            </b>
          </span>
        </div> */}
      </Fade>
    </div>
  );
}
