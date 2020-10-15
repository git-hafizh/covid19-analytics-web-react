import React from "react";
import { CardTitle, CardImg, Card } from "reactstrap";
import '../../Pages/style.css';
import axios from 'axios';
import Slider from "react-slick";
import "./style.css";
import './css/slick.min.css';
import './css/slick.theme.css';


export default function Konten() {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    getNewsAPI();
  },[])

  const thisApiKey = "8dd49b1983464a37aa7fac7c1111f95a";

  const getNewsAPI = () => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=covid&apiKey=${thisApiKey}`)
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
      <span className="h-news">News</span>
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
