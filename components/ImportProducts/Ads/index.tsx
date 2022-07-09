import { FC } from "react";
import Slider from "react-slick";
import { chakra, Link } from "@chakra-ui/react";
import Ad from "./Ad";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface AdsData {
  link: string;
  img: string;
  companyName: string;
}

const Ads: FC = () => {
  const adsData: AdsData[] = [
    {
      link: "",
      img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      companyName: "Mall",
    },
    {
      link: "https://www.tesla.com",
      img: "https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRlc2xhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      companyName: "Tesla",
    },
    {
      link: "https://www.tesla.com",
      img: "https://media.istockphoto.com/photos/abstract-colorful-shape-picture-id1178513512?b=1&k=20&m=1178513512&s=170667a&w=0&h=Awe0QYADR6h1xhE1yLYIDOJDUYG4l9yPi7c4omM4BBU=",
      companyName: "Grass",
    },
    {
      link: "",
      img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      companyName: "Mall",
    },
    {
      link: "https://www.tesla.com",
      img: "https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRlc2xhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      companyName: "Tesla",
    },
    {
      link: "https://www.tesla.com",
      img: "https://media.istockphoto.com/photos/abstract-colorful-shape-picture-id1178513512?b=1&k=20&m=1178513512&s=170667a&w=0&h=Awe0QYADR6h1xhE1yLYIDOJDUYG4l9yPi7c4omM4BBU=",
      companyName: "Grass",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          // dots: false,
          // slidesToShow: 3,
          // slidesToScroll: 1,
          // infinite: true,
          // speed: 2000,
          // autoplaySpeed: 2000,
          // cssEase: "linear",
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <chakra.div w="100%">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        {adsData.map((data) => (
          <Link key={data.img} href={data.link} isExternal>
            <Ad img={data.img} companyName={data.companyName} />
          </Link>
        ))}
      </Slider>
    </chakra.div>
  );
};

export default Ads;
