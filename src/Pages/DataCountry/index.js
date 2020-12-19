import React from "react";
import "./style.css";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Input
} from "reactstrap";
import "../../Pages/style.css";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { getFetchCasesSelectedCountry, getFetchCountryName } from "../../redux/fetchDataAPI";

export default function DataCountry() {
  const countryState = useSelector(state => state)
  const dispatch = useDispatch();

  React.useEffect(() => {
    pickCountry();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickCountry = (country, countryName) => {
    dispatch(getFetchCasesSelectedCountry(country))
    dispatch(getFetchCountryName(countryName))
  };

  function handleChange(event) {
    const { value } = event.target;

    pickCountry(value);
  }

  return (
    <>
      <div className="data" style={{ position: "relative", top: "-4rem" }}>
        <span className="country">
          Country Cases
        </span>
        <div style={{ width: "30%", justifyContent: "center", margin: "2rem auto" }}>
          <Form>
            <Input
              style={{ cursor: "pointer" }}
              type="select"
              name="selected"
              onChange={handleChange}
              value={countryState.country}
            >
              {countryState.countryName.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Input>
          </Form>
        </div>
        <div style={{ marginBottom: "5rem" }}>
          <Row className="country" sm={5} style={{ justifyContent: "center" }}>
            <Col>
              <Card id="menu1">
                <CardBody>
                  <CardTitle style={{ fontWeight: 600 }}>
                    Confirmed
                  </CardTitle>
                  <CardText style={{ color: "#4D6CFF", fontSize: 18, fontWeight: 600 }}>
                    <NumberFormat
                      value={countryState.countryConfirmed}
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
                  <CardText style={{ color: "#67D3B3", fontSize: 18, fontWeight: 600 }}>
                    <NumberFormat
                      value={countryState.countryRecovered}
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
                  <CardText style={{ color: "#EF7943", fontSize: 18, fontWeight: 600 }}>
                    <NumberFormat
                      value={countryState.countryDeath}
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
