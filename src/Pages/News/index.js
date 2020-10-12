import React from "react";
import { CardTitle, CardImg, Card } from "reactstrap";
import '../../Pages/style.css';
import axios from 'axios';
import Slider from "react-slick";
import './css/slick.min.css';
import './css/slick.theme.css';


export default function Konten() {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    getNewsAPI();
  },[])

  const thisApiKey = "8dd49b1983464a37aa7fac7c1111f95a";

  const getNewsAPI = () => {
    axios.get(`//newsapi.org/v2/everything?q=covid&apiKey=${thisApiKey}`,  {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true"
      }
    })
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div style={{position: "relative", marginTop: "-2rem"}}>
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
      }}>News</span>
    </div>
    <Slider {...settings} style={{marginBottom: "1rem"}}>
      {news.map((item, index) => (
        <div key={index}>
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
