import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AiFillStar, 
  AiOutlineRocket, 
  AiOutlineGlobal, 
  AiOutlineCalendar,
  AiOutlineRight,
  AiOutlineLeft
} from "react-icons/ai";

const SpaceFacts = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const spaceFacts = [
    {
      id: 1,
      title: "The Observable Universe",
      fact: "The observable universe is about 93 billion light-years in diameter. There are more stars in the universe than grains of sand on all the beaches on Earth.",
      category: "cosmology",
      icon: <AiOutlineGlobal />,
      source: "NASA",
      year: "2023"
    },
    {
      id: 2,
      title: "James Webb Discoveries",
      fact: "The James Webb Space Telescope has discovered galaxies that formed just 400 million years after the Big Bang, rewriting our understanding of early galaxy formation.",
      category: "telescope",
      icon: <AiFillStar />,
      source: "Space.com",
      year: "2024"
    },
    {
      id: 3,
      title: "Mars Water Evidence",
      fact: "Recent Mars rover discoveries show evidence of ancient river systems and lakes that existed for millions of years, suggesting Mars once had conditions suitable for life.",
      category: "planetary",
      icon: <AiOutlineRocket />,
      source: "Nature Journal",
      year: "2024"
    },
    {
      id: 4,
      title: "Exoplanet Breakthrough",
      fact: "Astronomers have identified over 5,000 exoplanets, with dozens located in their star's habitable zone where liquid water could exist.",
      category: "exoplanets",
      icon: <AiFillStar />,
      source: "NASA Exoplanet Archive",
      year: "2024"
    },
    {
      id: 5,
      title: "Black Hole Imaging",
      fact: "The Event Horizon Telescope captured the first image of a black hole's shadow in 2019 and recently revealed the magnetic fields around it, advancing our understanding of these cosmic phenomena.",
      category: "astrophysics",
      icon: <AiOutlineGlobal />,
      source: "Event Horizon Telescope",
      year: "2023"
    },
    {
      id: 6,
      title: "Artemis Mission Progress",
      fact: "NASA's Artemis program aims to return humans to the Moon by 2026, establishing a sustainable presence as a stepping stone for future Mars missions.",
      category: "spaceflight",
      icon: <AiOutlineRocket />,
      source: "NASA",
      year: "2024"
    },
    {
      id: 7,
      title: "Dark Energy Update",
      fact: "Recent observations suggest dark energy may be evolving over time, challenging the standard cosmological model and our understanding of the universe's expansion.",
      category: "cosmology",
      icon: <AiOutlineGlobal />,
      source: "Dark Energy Survey",
      year: "2024"
    },
    {
      id: 8,
      title: "Space Tourism Milestone",
      fact: "Commercial spaceflight has launched over 50 private citizens to space, marking the beginning of a new era in space accessibility and tourism.",
      category: "commercial",
      icon: <AiOutlineRocket />,
      source: "SpaceX",
      year: "2024"
    }
  ];

  const categories = {
    cosmology: { color: "#8b5cf6", label: "Cosmology" },
    telescope: { color: "#06b6d4", label: "Telescope" },
    planetary: { color: "#10b981", label: "Planetary" },
    exoplanets: { color: "#f59e0b", label: "Exoplanets" },
    astrophysics: { color: "#ef4444", label: "Astrophysics" },
    spaceflight: { color: "#3b82f6", label: "Spaceflight" },
    commercial: { color: "#ec4899", label: "Commercial" }
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % spaceFacts.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, spaceFacts.length]);

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % spaceFacts.length);
    setIsAutoPlaying(false);
  };

  const prevFact = () => {
    setCurrentFactIndex((prev) => (prev - 1 + spaceFacts.length) % spaceFacts.length);
    setIsAutoPlaying(false);
  };

  const goToFact = (index) => {
    setCurrentFactIndex(index);
    setIsAutoPlaying(false);
  };

  const currentFact = spaceFacts[currentFactIndex];
  const categoryInfo = categories[currentFact.category];

  return (
    <Container
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <PageHeader>
        <PageTitle>
          <span>02</span>SPACE FACTS & INSIGHTS
        </PageTitle>
        <PageSubtitle>
          Discover fascinating updates and breakthroughs from the cosmos
        </PageSubtitle>
      </PageHeader>

      <FactContainer>
        <FactCard
          key={currentFact.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <FactHeader>
            <CategoryTag $color={categoryInfo.color}>
              {categoryInfo.icon}
              {categoryInfo.label}
            </CategoryTag>
            <FactNumber>
              {String(currentFactIndex + 1).padStart(2, '0')}/{String(spaceFacts.length).padStart(2, '0')}
            </FactNumber>
          </FactHeader>

          <FactTitle>{currentFact.title}</FactTitle>
          
          <FactText>{currentFact.fact}</FactText>

          <FactMeta>
            <MetaItem>
              <AiOutlineCalendar />
              <span>{currentFact.year}</span>
            </MetaItem>
            <MetaItem>
              <SourceIcon />
              <span>{currentFact.source}</span>
            </MetaItem>
          </FactMeta>

          <NavigationControls>
            <NavButton onClick={prevFact} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <AiOutlineLeft />
            </NavButton>
            
            <PlayPauseButton 
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              $isPlaying={isAutoPlaying}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAutoPlaying ? "Pause" : "Play"}
            </PlayPauseButton>
            
            <NavButton onClick={nextFact} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <AiOutlineRight />
            </NavButton>
          </NavigationControls>
        </FactCard>

        <ProgressIndicator>
          {spaceFacts.map((_, index) => (
            <ProgressDot
              key={index}
              $isActive={index === currentFactIndex}
              $isAutoPlaying={isAutoPlaying}
              onClick={() => goToFact(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </ProgressIndicator>

        <QuickFacts>
          <QuickFactsTitle>Quick Categories</QuickFactsTitle>
          <CategoryGrid>
            {Object.entries(categories).map(([key, { color, label }]) => (
              <CategoryChip
                key={key}
                $color={color}
                $isActive={currentFact.category === key}
                onClick={() => {
                  const factIndex = spaceFacts.findIndex(fact => fact.category === key);
                  if (factIndex !== -1) goToFact(factIndex);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </CategoryChip>
            ))}
          </CategoryGrid>
        </QuickFacts>
      </FactContainer>
    </Container>
  );
};

// Styled Components
const Container = styled(motion.section)`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
  min-height: 100vh;
  padding: 120px 10% 80px;

  @media (max-width: 768px) {
    padding: 100px 5% 60px;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const PageTitle = styled.h1`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 28px;
  letter-spacing: 4.725px;
  color: #0f172a;
  text-transform: uppercase;
  margin-bottom: 16px;

  span {
    font-weight: 700;
    color: #1e40af;
    opacity: 0.5;
    margin-right: 28px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    letter-spacing: 3.375px;
    
    span {
      margin-right: 18px;
    }
  }
`;

const PageSubtitle = styled.p`
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

const FactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FactCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const FactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${props => props.$color}15;
  color: ${props => props.$color};
  border: 1px solid ${props => props.$color}30;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
`;

const FactNumber = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  color: #64748b;
  letter-spacing: 2px;
`;

const FactTitle = styled.h2`
  font-family: 'Bellefair', serif;
  font-size: 32px;
  color: #0f172a;
  margin: 0 0 20px 0;
  font-weight: 400;
  background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const FactText = styled.p`
  font-family: 'Barlow', sans-serif;
  font-size: 18px;
  line-height: 32px;
  color: #475569;
  margin: 0 0 30px 0;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 28px;
  }
`;

const FactMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  color: #64748b;

  svg {
    font-size: 16px;
  }
`;

const SourceIcon = styled(AiFillStar)`
  color: #f59e0b;
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const NavButton = styled(motion.button)`
  background: #1e40af;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background: #3730a3;
  }
`;

const PlayPauseButton = styled(motion.button)`
  background: ${props => props.$isPlaying ? '#ef4444' : '#10b981'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ProgressDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$isActive ? '#1e40af' : '#cbd5e1'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.$isActive && props.$isAutoPlaying ? '20px' : '0px'};
    height: ${props => props.$isActive && props.$isAutoPlaying ? '20px' : '0px'};
    border-radius: 50%;
    background: #1e40af;
    opacity: 0.2;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

const QuickFacts = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
`;

const QuickFactsTitle = styled.h3`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 18px;
  letter-spacing: 2px;
  color: #0f172a;
  text-transform: uppercase;
  margin: 0 0 20px 0;
  text-align: center;
  font-weight: 600;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
`;

const CategoryChip = styled(motion.button)`
  background: ${props => props.$isActive ? props.$color : 'transparent'};
  color: ${props => props.$isActive ? 'white' : props.$color};
  border: 1px solid ${props => props.$color};
  padding: 10px 16px;
  border-radius: 20px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${props => props.$color};
    color: white;
    transform: translateY(-1px);
  }
`;

export default SpaceFacts;