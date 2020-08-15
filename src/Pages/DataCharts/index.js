import React from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import moment from 'moment';
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import '../../Pages/style.css';

export default function DataCharts() {
  const [onTab, setOnTab] = React.useState("1");
  const [confirmed, setConfirmed] = React.useState({});
  const [setRecovered] = React.useState({});

  const getRecoveredAPI = () => {
    axios.get("https://api.covid19api.com/dayone/country/indonesia/status/recovered")
      .then((result) => {
        const dataRecovered = result.data;
        let empCases = [];
        let empDates = [];
        dataRecovered.forEach((record) => {
          empCases.push(record.Cases);
          empDates.push(moment(record.Date).format('LL'));
        });
        setRecovered({
          labels: empDates,
          datasets: [
            {
              label: "Sembuh",
              data: empCases,
              backgroundColor: "#1dd1a1",
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getConfirmedAPI = () => {
    axios.get("https://api.covid19api.com/dayone/country/indonesia/status/confirmed")
      .then((result) => {
        const dataConfirmed = result.data;
        let empCases = [];
        let empDates = [];
        dataConfirmed.forEach((record) => {
          empCases.push(record.Cases);
          empDates.push(moment(record.Date).format('LL'));
        });

        setConfirmed({
          labels: empDates,
          datasets: [
            {
              label: "Terkonfirmasi",
              data: empCases,
              backgroundColor: "#fff200",
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getConfirmedAPI();
    getRecoveredAPI();
  }, []);


  return (
    <div
      style={{
        width: "70%",
        height: "auto",
        justifyContent: "center",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "1rem"
      }}
    >
      <Nav tabs>
        <NavItem style={{cursor: "pointer"}}>
          <NavLink 
          active={onTab === "1"}
          onClick={() => setOnTab("1")}>
            Grafik
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={onTab}>
        <TabPane tabId="1">
          <Line data={confirmed}/>
        </TabPane>
      </TabContent>
    </div>
  );
}
