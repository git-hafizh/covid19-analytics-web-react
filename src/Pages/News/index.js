import React from "react";
import { CardTitle, CardImg, CardBody, Card } from "reactstrap";
import '../../Pages/style.css';
import axios from 'axios';
import Slider from "react-slick";
import './css/slick.min.css';
import './css/slick.theme.css';


export default function Konten() {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    getNewsAPI();
  })

  const thisApiKey = "8dd49b1983464a37aa7fac7c1111f95a";

  const getNewsAPI = () => {
    axios.get(`http://newsapi.org/v2/everything?q=covid&apiKey=${thisApiKey}`)
    .then((res) => {
      setNews(res.data.articles)
    })
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
  };

  return (
    <div style={{position: "relative", marginTop: 48}}>
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
        top: -50
        // writingMode: "vertical-rl",
        // textOrientation: "upright"
      }}>News</span>
    </div>
    <Slider {...settings}>
      {news.map(item => (
        <div>
          <Card>
            <CardImg style={{width: "100", height:"300", textAlign: "center"}} src={item.urlToImage}/>
            <CardTitle style={{fontSize: 14, padding: "0px 2px"}}>
              <a style={{textDecoration: "none", fontWeight: 600}} href={item.url}>
                {item.title}
              </a>
            </CardTitle>
          </Card>
        </div>
      ))}
    </Slider>
    </div>
  );
}
