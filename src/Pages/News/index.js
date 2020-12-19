import React from "react";
import { CardTitle, CardImg, Card } from "reactstrap";
import '../../Pages/style.css';
import Slider from "react-slick";
import "./style.css";
import './css/slick.min.css';
import './css/slick.theme.css';
import { useDispatch, useSelector } from "react-redux";
import { getNewsData } from "../../redux/fetchDataAPI";


export default function Konten() {
  const newsState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getNewsAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getNewsAPI = (news) => {
    dispatch(getNewsData(news))
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
      {newsState.news.map((item, index) => (
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
