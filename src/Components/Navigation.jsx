import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GoEyeClosed } from "react-icons/go";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef();

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  const navLinks = [
    { to: "/", title: "Home", span: "00" },
    { to: "/articles", title: "Articles", span: "01" },
    { to: "/spaceFacts", title: "SpaceFacts", span: "02" },
    { to: "/bookmarks", title: "Bookmarks", span: "03" },
  ];

  return (
    <StyledNav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
    >
      <NavContent>
        <Logo>
          <NavLink to="/" onClick={closeNav}>
            SpaceNews
          </NavLink>
        </Logo>

        <SeparatorLine />

        <NavContainer $isOpen={isOpen} ref={navRef}>
          <NavList>
            {navLinks.map(({ title, to, span }) => (
              <NavItem key={to}>
                <NavLink
                  to={to}
                  onClick={closeNav}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <IndexNumber>{span}</IndexNumber>
                  {title}
                </NavLink>
              </NavItem>
            ))}
          </NavList>

          <CloseButton
            onClick={toggleNav}
            aria-label="Close menu"
          ></CloseButton>
        </NavContainer>

        <HamburgerButton
          onClick={toggleNav}
          $isOpen={isOpen}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </HamburgerButton>
      </NavContent>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(30, 64, 175, 0.1);
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  height: 80px;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 0 6%;
    height: 90px;
  }

  @media (min-width: 1024px) {
    padding: 0 8%;
    height: 100px;
  }

  @media (min-width: 1440px) {
    padding: 0 10%;
  }
`;

const Logo = styled.div`
  a {
    font-size: 1.8rem;
    font-weight: 800;
    text-decoration: none;
    color: #1e40af;
    font-family: "Inter", sans-serif;
    letter-spacing: 1.5px;
    transition: color 0.3s ease;

    &:hover {
      color: #3b82f6;
    }
  }

  @media (min-width: 768px) {
    a {
      font-size: 2.2rem;
    }
  }
`;

const SeparatorLine = styled.div`
  flex: 1;
  height: 1px;
  background: #1e40af;
  opacity: 0.2;
  margin: 0 40px;
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1023px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    height: 100vh;
    background: linear-gradient(135deg, #ffffff 80%, #e0e7ff 100%);
    backdrop-filter: blur(40px);
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.15);
    transform: ${(props) =>
      props.$isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 100px 30px 40px;
    flex-direction: column;
    z-index: 999;
    border-left: 2px solid rgba(30, 64, 175, 0.2);
  }

  @media (min-width: 1024px) {
    position: static;
    width: auto;
    background: none;
    box-shadow: none;
    transform: none;
    padding: 0;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 40px;

  @media (max-width: 1023px) {
    flex-direction: column;
    gap: 25px;
    width: 100%;
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    gap: 30px;
  }

  @media (min-width: 1280px) {
    gap: 50px;
  }
`;

const NavItem = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 15px;
    letter-spacing: 2px;
    color: #374151;
    text-decoration: none;
    padding: 12px 0;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      color: #1e40af;
      border-bottom-color: rgba(30, 64, 175, 0.3);
    }

    &.active {
      color: #1e40af;
      border-bottom-color: #1e40af;
      font-weight: 600;
    }
  }

  @media (max-width: 1023px) {
    width: 100%;

    a {
      padding: 15px 0;
      border-bottom: none;
      border-left: 4px solid transparent;
      padding-left: 15px;
      font-size: 16px;

      &:hover,
      &.active {
        border-bottom: none;
        border-left-color: #1e40af;
        background: rgba(30, 64, 175, 0.05);
        border-radius: 0 8px 8px 0;
      }
    }
  }

  @media (min-width: 1280px) {
    a {
      font-size: 16px;
      gap: 12px;
    }
  }
`;

const IndexNumber = styled.span`
  font-weight: 700;
  color: #1e40af;
  font-size: 14px;

  @media (max-width: 1023px) {
    font-size: 15px;
  }

  @media (min-width: 1280px) {
    font-size: 16px;
  }
`;

const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  transition: opacity 0.3s ease;

  span {
    height: 3px;
    width: 100%;
    background: #1e40af;
    border-radius: 3px;
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) {
      transform: ${(props) =>
        props.$isOpen ? "rotate(45deg) translate(6px, 6px)" : "none"};
    }

    &:nth-child(2) {
      opacity: ${(props) => (props.$isOpen ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${(props) =>
        props.$isOpen ? "rotate(-45deg) translate(6px, -6px)" : "none"};
    }
  }

  &:hover span {
    background: #3b82f6;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;
  background: none;
  border: none;
  color: #1e40af;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
  z-index: 1002;

  &:hover {
    color: #3b82f6;
    background: rgba(30, 64, 175, 0.1);
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export default Navigation;
