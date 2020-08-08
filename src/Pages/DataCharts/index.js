import React from "react";
import axios from "axios";
import { Bar, Line, Doughnut, Bubble } from "react-chartjs-2";
import moment from 'moment';
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import '../../Pages/style.css';

export default function DataCharts() {
  const [isCases, setIsCases] = React.useState({});
  const [onTab, setOnTab] = React.useState("1");
  const [confirmed, setConfirmed] = React.useState({});
  const [death, setDeath] = React.useState({});
  const [recovered, setRecovered] = React.useState({});

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
      }}
    >
      <Nav tabs>
        <NavItem style={{cursor: "pointer"}}>
          <NavLink 
          active={onTab === "1"}
          onClick={() => setOnTab("1")}>
            Bar
          </NavLink>
        </NavItem>
        <NavItem style={{cursor: "pointer"}} >
          <NavLink active={onTab === "2"}
          onClick={() => setOnTab("2")}>
            Line
          </NavLink>
        </NavItem>
        <NavItem style={{cursor: "pointer"}} >
          <NavLink active={onTab === "3"}
          onClick={() => setOnTab("3")}>
            Bubble
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={onTab}>
        <TabPane tabId="1">
          <Line data={confirmed}
            // options={{
            //     scales: {
            //         xAxes: [{
            //             unit: 'day',
            //             type: 'time',
            //             time: {
            //                 displayFormats: {
            //                     second: 'h:MM:SS',
            //                     minute: 'h:MM',
            //                     hour: 'hA',
            //                     day: 'MMM D YYYY',
            //                     month: 'YYYY MMM',
            //                     year: 'YYYY'
            //                 },                            
            //             },
            //             display: true,                      
            //         }]     
            //     }
            // }}
          />
        </TabPane>
      </TabContent>
      <TabContent activeTab={onTab} >
        <TabPane tabId="2">
          <Bar data={recovered} 
            // options={{
            //     scales: {
            //         xAxes: [{
            //             unit: 'day',
            //             type: 'time',
            //             time: {
            //                 displayFormats: {
            //                     second: 'h:MM:SS',
            //                     minute: 'h:MM',
            //                     hour: 'hA',
            //                     day: 'MMM D YYYY',
            //                     month: 'YYYY MMM',
            //                     year: 'YYYY'
            //                 },                            
            //             },
            //             display: true,                      
            //         }]     
            //     }
            // }}
          />
        </TabPane>
      </TabContent>
      <TabContent activeTab={onTab} >
        <TabPane tabId="3">
          <Line data={death} 
            // options={{
            //     scales: {
            //         xAxes: [{
            //             unit: 'day',
            //             type: 'time',
            //             time: {
            //                 displayFormats: {
            //                     second: 'h:MM:SS',
            //                     minute: 'h:MM',
            //                     hour: 'hA',
            //                     day: 'MMM D YYYY',
            //                     month: 'YYYY MMM',
            //                     year: 'YYYY'
            //                 },                            
            //             },
            //             display: true,                      
            //         }]     
            //     }
            // }}
          />
        </TabPane>
      </TabContent>
    </div>
  );
}
