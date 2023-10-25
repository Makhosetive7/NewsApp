import React, { useState } from "react";
import styled from "styled-components";
import {GoEyeClosed} from "react-icons/go "
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
    <div className="Logo">
      <NavLink to="/">SpaceNews</NavLink>
    </div>
    <div className="Hamburger" onClick={() => setIsOpen(!isOpen)}>
      <span />
      <span />
      <span />
      <span />
    </div>
    <Menu isOpen={isOpen}>
      <CloseButton onClick={() => setIsOpen(false)}><GoEyeClosed/></CloseButton>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Articles
          </NavLink>git 
        </li>
        <li>
          <NavLink to="/blogs" activeClassName="active">
            Blogs
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" activeClassName="active">
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookmarks" activeClassName="active">
            Bookmarks
          </NavLink>
        </li>
      </ul>
    </Menu>
  </Nav>
  );
};

const CloseButton = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 2rem;
  color: blue;
  @media (max-width: 900px) {
    display: block;
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  height: 5rem;
  .Logo {
    a {
      font-size: 3rem;
      border: 1px solid transparent;
      text-decoration: none;
      color: blue;
    }
  }
  .Hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
    span {
      height: 2px;
      width: 25px;
      background: blue;
      margin-bottom: 4px;
      border-radius: 5px;
    }
    @media (max-width: 900px) {
      display: flex;
    }
  }
`;


const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 50%;
  ul {
    display: flex;
    justify-content: space-evenly;
    list-style-type: none;
    width: 100%;
    @media (max-width: 900px) {
      flex-direction: column; 
    }
  }
  li{
    margin-bottom: 1rem;
  }
  a {
    text-decoration: none;
    font-size: 1.4rem;
    color: blue;
    padding: .5rem;
  }
  a:hover {
    border: black;
    background-color: blue;
    color: white;
    border-radius: 7px;
  }
  .active {
    border: black;
    background-color: blue;
    color: white;
    border-radius: 7px;
  }
  @media (max-width: 900px) {
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "100vh" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100vw;
    height: 40vh;
    margin-top: 10rem;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 38, 255, 0.2),
      0 6px 20px 0 rgba(40, 110, 216, 0.19);
  }
`;

export default Navigation;
