import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

// SVG Components for each section
const ArticlesSVG = () => (
  <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Document */}
    <rect x="100" y="80" width="200" height="240" rx="8" fill="white" stroke="#1e40af" strokeWidth="2"/>
    <rect x="120" y="110" width="160" height="8" rx="4" fill="#e2e8f0"/>
    <rect x="120" y="130" width="140" height="6" rx="3" fill="#e2e8f0"/>
    <rect x="120" y="150" width="160" height="8" rx="4" fill="#e2e8f0"/>
    <rect x="120" y="170" width="130" height="6" rx="3" fill="#e2e8f0"/>
    <rect x="120" y="190" width="160" height="8" rx="4" fill="#e2e8f0"/>
    <rect x="120" y="210" width="150" height="6" rx="3" fill="#e2e8f0"/>
    <rect x="120" y="230" width="160" height="8" rx="4" fill="#e2e8f0"/>
    
    {/* Pen */}
    <rect x="250" y="60" width="8" height="30" rx="4" fill="#3b82f6"/>
    <path d="M254 60 L266 48 L270 52 L258 64 Z" fill="#1e40af"/>
    
    {/* Stars */}
    <circle cx="320" cy="120" r="2" fill="#1e40af"/>
    <circle cx="340" cy="180" r="1.5" fill="#1e40af"/>
    <circle cx="300" cy="280" r="2" fill="#1e40af"/>
  </svg>
);

const BlogsSVG = () => (
  <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Laptop */}
    <rect x="80" y="140" width="240" height="160" rx="12" fill="white" stroke="#1e40af" strokeWidth="2"/>
    <rect x="100" y="160" width="200" height="120" rx="4" fill="#0f172a"/>
    <rect x="140" y="310" width="120" height="8" rx="4" fill="#cbd5e1"/>
    
    {/* Screen Content */}
    <rect x="120" y="180" width="160" height="6" rx="3" fill="#3b82f6"/>
    <rect x="120" y="200" width="140" height="4" rx="2" fill="#64748b"/>
    <rect x="120" y="210" width="160" height="6" rx="3" fill="#3b82f6"/>
    <rect x="120" y="230" width="130" height="4" rx="2" fill="#64748b"/>
    <rect x="120" y="240" width="160" height="6" rx="3" fill="#3b82f6"/>
    
    {/* Coffee Cup */}
    <path d="M300 200 C300 180, 320 170, 340 180 C340 200, 320 210, 300 200 Z" fill="#f1f5f9" stroke="#1e40af" strokeWidth="2"/>
    <rect x="330" y="190" width="4" height="20" rx="2" fill="#94a3b8"/>
  </svg>
);

const ReportsSVG = () => (
  <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Chart */}
    <rect x="100" y="120" width="200" height="180" rx="8" fill="white" stroke="#1e40af" strokeWidth="2"/>
    
    {/* Chart Bars */}
    <rect x="130" y="220" width="20" height="60" rx="2" fill="#3b82f6"/>
    <rect x="160" y="180" width="20" height="100" rx="2" fill="#1e40af"/>
    <rect x="190" y="150" width="20" height="130" rx="2" fill="#60a5fa"/>
    <rect x="220" y="200" width="20" height="80" rx="2" fill="#3b82f6"/>
    <rect x="250" y="170" width="20" height="110" rx="2" fill="#1e40af"/>
    
    {/* Chart Axis */}
    <line x1="120" y1="280" x2="280" y2="280" stroke="#cbd5e1" strokeWidth="2"/>
    <line x1="120" y1="120" x2="120" y2="280" stroke="#cbd5e1" strokeWidth="2"/>
    
    {/* Magnifying Glass */}
    <circle cx="320" cy="100" r="20" fill="none" stroke="#1e40af" strokeWidth="2"/>
    <line x1="335" y1="115" x2="355" y2="135" stroke="#1e40af" strokeWidth="2"/>
    
    {/* Data Points */}
    <circle cx="280" cy="180" r="3" fill="#10b981"/>
    <circle cx="300" cy="200" r="3" fill="#10b981"/>
    <circle cx="320" cy="190" r="3" fill="#10b981"/>
  </svg>
);

const BookmarksSVG = () => (
  <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Books */}
    <rect x="120" y="100" width="40" height="180" rx="4" fill="#3b82f6"/>
    <rect x="125" y="105" width="30" height="170" rx="2" fill="#1e40af"/>
    
    <rect x="170" y="80" width="40" height="200" rx="4" fill="#1e40af"/>
    <rect x="175" y="85" width="30" height="190" rx="2" fill="#3b82f6"/>
    
    <rect x="220" y="120" width="40" height="160" rx="4" fill="#60a5fa"/>
    <rect x="225" y="125" width="30" height="150" rx="2" fill="#1e40af"/>
    
    {/* Bookmark Ribbons */}
    <path d="M280 100 L300 80 L320 100 L320 250 L300 270 L280 250 Z" fill="#ef4444"/>
    <path d="M290 90 L300 80 L310 90" fill="#dc2626" stroke="#dc2626" strokeWidth="1"/>
    
    <path d="M330 140 L350 120 L370 140 L370 220 L350 240 L330 220 Z" fill="#10b981"/>
    <path d="M340 130 L350 120 L360 130" fill="#059669" stroke="#059669" strokeWidth="1"/>
    
    {/* Stars */}
    <circle cx="300" cy="300" r="2" fill="#1e40af"/>
    <circle cx="320" cy="320" r="1.5" fill="#1e40af"/>
    <circle cx="340" cy="290" r="2" fill="#1e40af"/>
  </svg>
);

const Container = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8rem 10% 4rem;
  gap: 5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
  color: #0f172a;
  min-height: 100vh;

  @media (max-width: 1100px) {
    flex-direction: column-reverse;
    text-align: center;
    padding: 6rem 5% 3rem;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    padding: 5rem 5% 2rem;
    gap: 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 5rem;
  max-width: 600px;

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 3rem;
    align-items: center;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  button {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid rgba(30, 64, 175, 0.3);
    background: transparent;
    color: #1e40af;
    font-family: 'Bellefair', serif;
    font-size: 32px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: #1e40af;
      color: #ffffff;
      border-color: #1e40af;
      box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
    }

    &:hover:not(.active) {
      border-color: #1e40af;
      background: rgba(30, 64, 175, 0.1);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 1100px) {
    flex-direction: row;
    order: 2;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    
    button {
      width: 60px;
      height: 60px;
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    button {
      width: 50px;
      height: 50px;
      font-size: 20px;
    }
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 470px;
`;

const Subtitle = styled.h4`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  letter-spacing: 2.7px;
  color: #475569;
  text-transform: uppercase;
  margin: 0;
  font-weight: 400;
`;

const Title = styled.h1`
  font-family: 'Bellefair', serif;
  font-size: 56px;
  text-transform: uppercase;
  margin: 0;
  font-weight: 400;
  background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-family: 'Barlow', sans-serif;
  font-size: 18px;
  line-height: 32px;
  color: #475569;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 28px;
  }
`;

const ExploreButton = styled.button`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: #ffffff;
  border: none;
  padding: 1.2rem 2.4rem;
  border-radius: 8px;
  font-family: 'Bellefair', serif;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  width: fit-content;
  box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(30, 64, 175, 0.4);
  }

  @media (max-width: 1100px) {
    align-self: center;
  }
`;

const SVGContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 400px;
    filter: drop-shadow(0 20px 40px rgba(30, 64, 175, 0.1));
  }

  @media (max-width: 1100px) {
    max-width: 350px;
    
    svg {
      height: 350px;
    }
  }

  @media (max-width: 768px) {
    max-width: 300px;
    
    svg {
      height: 300px;
    }
  }

  @media (max-width: 480px) {
    max-width: 250px;
    
    svg {
      height: 250px;
    }
  }
`;

const SectionTitle = styled.div`
  position: absolute;
  top: -80px;
  left: 0;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 28px;
  letter-spacing: 4.725px;
  color: #0f172a;
  text-transform: uppercase;

  span {
    font-weight: 700;
    color: #1e40af;
    opacity: 0.5;
    margin-right: 28px;
  }

  @media (max-width: 1100px) {
    position: static;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 20px;
    letter-spacing: 3.375px;

    span {
      margin-right: 18px;
    }
  }

  @media (max-width: 768px) {
    font-size: 16px;
    letter-spacing: 2.7px;
    
    span {
      margin-right: 12px;
    }
  }
`;

const ResourcesSection = () => {
  const [selected, setSelected] = useState("Articles");
  const navigate = useNavigate();

  const sections = [
    {
      name: "Articles",
      description: "Discover groundbreaking space discoveries, cosmic events, and interstellar breakthroughs. Stay updated with the most fascinating developments in space exploration, astronomy, and the future of interplanetary travel.",
      svg: <ArticlesSVG />,
      path: "/titles",
    },
    {
      name: "Blogs",
      description: "Read insightful perspectives from space experts, astronauts, and astronomy enthusiasts. Get behind-the-scenes stories and personal experiences from the space community and mission specialists.",
      svg: <BlogsSVG />,
      path: "/blogs",
    },
    {
      name: "Reports",
      description: "Access comprehensive scientific reports, mission analyses, and technical papers. Dive deep into data-driven insights and research findings from space agencies and astronomical observatories worldwide.",
      svg: <ReportsSVG />,
      path: "/reports",
    },
    {
      name: "Bookmarks",
      description: "Quick access to your saved articles, favorite blogs, and important reports. Your personalized space news collection, always available when you need it across all your devices.",
      svg: <BookmarksSVG />,
      path: "/bookmarks",
    },
  ];

  return (
    <Container
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 60 }}
    >
      <SectionTitle>
        <span>03</span>EXPLORE OUR RESOURCES
      </SectionTitle>

      {sections
        .filter((item) => item.name === selected)
        .map(({ name, description, svg, path }, i) => (
          <React.Fragment key={i}>
            <Content>
              <Tabs>
                {sections.map((tab, index) => (
                  <button
                    key={index}
                    className={selected === tab.name ? "active" : ""}
                    onClick={() => setSelected(tab.name)}
                  >
                    {index + 1}
                  </button>
                ))}
              </Tabs>
              
              <TextContent>
                <Subtitle>THE TERMINOLOGY...</Subtitle>
                <Title>{name}</Title>
                <Description>{description}</Description>
                <ExploreButton onClick={() => navigate(path)}>
                  Explore {name}
                </ExploreButton>
              </TextContent>
            </Content>

            <SVGContainer>
              {svg}
            </SVGContainer>
          </React.Fragment>
        ))}
    </Container>
  );
};

export default ResourcesSection;