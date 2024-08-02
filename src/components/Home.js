import React from 'react';
import Slider from 'react-slick';  // Import Slider component from react-slick
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  const images = [
    { name: 'Coffee', filename: 'coffee.jpeg', text: 'Enjoy Coffee!' },
    { name: 'Tea', filename: 'tea.jpeg', text: 'Relax with Tea!' },
    { name: 'Pizza', filename: 'pizza.jpeg', text: 'Delicious Pizza!' },
    { name: 'Burger', filename: 'burger.jpeg', text: 'Tasty Burger!' },
    { name: 'Drink', filename: 'drink.jpeg', text: 'Cool Drink!' }
  ];

  // Slider settings (unchanged)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <div className="image-container">
              <img
                src={process.env.PUBLIC_URL + '/' + image.filename}
                alt={image.name}
                className="carousel-image"
              />
              <div className="overlay-text">{image.text}</div>
            </div>
          </div>
        ))}
      </Slider>
      <div>
        <Link to="/place-order" className="button-link1">Book Now</Link>
        <p id="Line">Order Fast to have your fav. meal or drink on your table</p>
      </div>
    </div>
  );
};

export default Home;
