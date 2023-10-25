import React from 'react'
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaRocket} from 'react-icons/fa';

const  Header = () => {
  return (
    <NavBar>
      <h1> SpaceNews <FaRocket/> </h1>
      <div className = "Links">
        <NavLink >Blog</NavLink>
        <NavLink >News</NavLink>
        <NavLink >Report</NavLink>
      </div>

    </NavBar>
  )
}

const NavBar = styled.div`
  display: Flex;
  justify-content: space-between;
  align-items: center;
  background-color: blue;
  height: 7rem;
  .Links{
    display: Flex;
  justify-content: space-between;
  width: 30%;
  align-items: center;
  padding: 4rem;
  font-size: 1.5rem
  }
  h1{
    margin: 3rem;
  }
`

export default Header;