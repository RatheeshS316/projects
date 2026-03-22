import React from 'react';
import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import Viewer from './viewer';
import Movies from './movies';
import Footerpage from './Footerpage';



const Home = () => {

  return (
    <Container>
      <ImgSlider />
      <Viewer />
      <Movies  />
      <Footerpage />
    </Container>
  )
}

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0px calc(2vw + 0px);
  position: relative;

  &:before {
     background-image: url("/images/home-background.png"); 
    background-position: center center;
    background-size:cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display:relative;
    z-index:1;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
`;
