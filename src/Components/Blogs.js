import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "../Components/Blog";
import styled from "styled-components";

import { MediaQuiries } from "./MediaQuiries";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get(
        "https://api.spaceflightnewsapi.net/v3/blogs"
      );
      console.log(response);
      setBlogs(response.data);
    };
    getBlogs();
  }, []);

  return (
    <Container>
      <div className="Banner">
        <h1>Blog</h1>
        <p>
          Blogs often provide a more detailed overview of launches and missions.
          A must-have for the serious spaceflight enthusiast
        </p>
      </div>
      <div className="BlogContainer">
        {blogs &&
          blogs.map((blog, index) => (
            <div>
              <Blog
                key={index}
                title={blog.title}
                summary={blog.summary}
                newsSite={blog.newsSite}
                url={blog.url}
                imageUrl={blog.imageUrl}
                publishedAt={blog.publishedAt}
              />
            </div>
          ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .Banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 7rem;
    background-color: #88b8f8;
    h1 {
      font-size: 3rem;
      font-family: "Play", sans-serif;
      letter-spacing: 0.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.5rem;
      font-family: "Play", sans-serif;
      margin-bottom: 1rem;
    }

    @media ${MediaQuiries.mobileS} {
      height: 10rem;
      padding-left: 2rem;
    }
  }
  .BlogContainer {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    margin-top: 1rem;
  }
`;
export default Blogs;
