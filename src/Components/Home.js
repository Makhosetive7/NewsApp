import React from 'react';
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ResourcesSection from './ResourcesSection';

// SVG Components
const SpaceNewsSVG = () => (
  <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Stars */}
    <circle cx="80" cy="120" r="1" fill="#1e40af" opacity="0.6"/>
    <circle cx="420" cy="80" r="1.5" fill="#1e40af" opacity="0.8"/>
    <circle cx="350" cy="200" r="1" fill="#1e40af" opacity="0.6"/>
    <circle cx="150" cy="300" r="1.5" fill="#1e40af" opacity="0.8"/>
    <circle cx="280" cy="350" r="1" fill="#1e40af" opacity="0.6"/>
    
    {/* Main Planet */}
    <circle cx="250" cy="200" r="80" fill="white" stroke="#1e40af" strokeWidth="2"/>
    <circle cx="220" cy="180" r="15" fill="#e2e8f0"/>
    <circle cx="290" cy="160" r="8" fill="#e2e8f0"/>
    <circle cx="270" cy="230" r="12" fill="#e2e8f0"/>
    
    {/* Satellite */}
    <g transform="translate(350, 100)">
      <rect x="-15" y="-5" width="30" height="10" rx="2" fill="#1e40af"/>
      <rect x="-8" y="5" width="16" height="20" fill="#1e40af"/>
      <rect x="-12" y="25" width="24" height="4" fill="#1e40af"/>
      <rect x="15" y="-2" width="20" height="6" fill="#1e40af"/>
      <rect x="-35" y="-2" width="20" height="6" fill="#1e40af"/>
    </g>
    
    {/* Rocket */}
    <g transform="translate(100, 280)">
      <path d="M20 0 L40 20 L0 20 Z" fill="#3b82f6"/>
      <rect x="5" y="20" width="30" height="40" fill="#1e40af"/>
      <rect x="0" y="60" width="40" height="10" fill="#374151"/>
      <circle cx="20" cy="35" r="8" fill="#60a5fa"/>
      <rect x="15" y="20" width="10" height="40" fill="#60a5fa" opacity="0.6"/>
    </g>
    
    {/* Orbits */}
    <circle cx="250" cy="200" r="120" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" fill="none"/>
    <circle cx="250" cy="200" r="160" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" fill="none"/>
  </svg>
);

const Home = () => {
  return (
    <StyledHome
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Container>
        <Main
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 70 }}
        >
          <MainContent>
            <p className="first_text">EXPLORE THE LATEST IN</p>
            <p className="second_text">SPACE NEWS</p>
            <p className="third_text">
              Discover groundbreaking discoveries, cosmic events, and interstellar 
              breakthroughs from across the universe. Stay updated with the most 
              fascinating developments in space exploration, astronomy, and the 
              future of interplanetary travel.
            </p>
          </MainContent>
          
          <ContentRight>
            <SVGContainer>
              <SpaceNewsSVG />
            </SVGContainer>
            <Link to="/titles">
              <MainDiagram>
                <span></span>
              </MainDiagram>
            </Link>
          </ContentRight>
        </Main>
      </Container>
      <ResourcesSection/>
    </StyledHome>
  );
};

// Styled Components
export const StyledHome = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%);
  min-height: 100vh;
  overflow: hidden;
  padding-top: 100px;

  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: calc(100vh - 80px);
  }
`;

export const Main = styled(motion.main)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  width: 100%;
  gap: 80px;

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 60px;
    justify-content: center;
    text-align: center;
    padding: 0 5%;
  }

  @media (max-width: 768px) {
    gap: 40px;
    padding: 40px 5%;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;

  p {
    font-style: normal;
    font-weight: 400;
    margin: 0;
  }

  .first_text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 4.725px;
    color: #1e40af;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .second_text {
    font-family: 'Bellefair', serif;
    font-size: 150px;
    line-height: 172px;
    color: #0f172a;
    text-transform: uppercase;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .third_text {
    font-family: 'Barlow', sans-serif;
    font-size: 18px;
    line-height: 32px;
    color: #475569;
  }

  @media (max-width: 1100px) {
    align-items: center;
    max-width: 600px;

    .first_text {
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 3.375px;
      margin-bottom: 20px;
    }

    .second_text {
      font-size: 120px;
      line-height: 130px;
      margin-bottom: 20px;
    }

    .third_text {
      font-size: 17px;
      line-height: 30px;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;

    .first_text {
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 2.7px;
      margin-bottom: 16px;
    }

    .second_text {
      font-size: 80px;
      line-height: 90px;
      margin-bottom: 16px;
    }

    .third_text {
      font-size: 16px;
      line-height: 28px;
    }
  }

  @media (max-width: 480px) {
    .first_text {
      font-size: 16px;
      letter-spacing: 2.3px;
    }

    .second_text {
      font-size: 70px;
      line-height: 80px;
    }

    .third_text {
      font-size: 15px;
      line-height: 25px;
    }
  }
`;

export const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media (max-width: 1100px) {
    order: -1;
  }
`;

export const SVGContainer = styled.div`
  width: 500px;
  height: 400px;
  
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 20px 40px rgba(30, 64, 175, 0.1));
  }

  @media (max-width: 1100px) {
    width: 400px;
    height: 320px;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 240px;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 200px;
  }
`;

export const MainDiagram = styled(motion.button)`
  border-radius: 50%;
  outline: none;
  border: none;
  width: 274px;
  height: 274px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  font-family: 'Bellefair', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 37px;
  letter-spacing: 2px;
  color: #ffffff;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 20px 40px rgba(30, 64, 175, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(1.8);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(30, 64, 175, 0.4);
  }

  span {
    position: relative;
    z-index: 1;
    
  }

  @media (max-width: 1100px) {
    width: 242px;
    height: 242px;
    font-size: 28px;
    line-height: 32px;
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 1.5px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 1.25px;
  }
`;

export default Home;