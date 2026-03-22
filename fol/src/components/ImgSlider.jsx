import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';

const ImgSlider = () => {
     let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
  };
  return (
    <Carousel  {...settings} >
      <Wrap>
            <img src="/images/slider-badag.jpg" />
      </Wrap>
       <Wrap>
            <img src="/images/slider-badging.jpg" />
      </Wrap>
      <Wrap>
        <img src="/images/slider-scale.jpg" />
      </Wrap>
       <Wrap>
            <img src="/images/slider-scales.jpg" />
      </Wrap>
    </Carousel>
  )
}

export default ImgSlider

const Carousel = styled(Slider)`
    margin-top:10px;
   
    ul li button{
    &:before{
    font-size:10px;
    color:rgba(255, 255, 255, 1)
    }
    }


    li.stick-active button:before{
   color:white;
    }

    .slick-list{
    overflow:visible;
    
    }

    button{
    color:white;
    background-color:rgb(0 ,0 , 0,0.6);
    z-index:1;
    }
`

const Wrap = styled.div`
    cursor:pointer;
    img{
    border:4px solid transparent;
    border-radius:4px;
    width:95vw;
    height:500px;
    box-shadow:rgb(0 0 0 / 69% ) 0px 26px 20px -10px , rgb( 0 0 0 / 73% ) 0px 16px 10px -10px;
    transition-duration:300ms;

    &:hover{
    border: 4px solid rgb( 249,249,249,0.8);
    }
    }
`