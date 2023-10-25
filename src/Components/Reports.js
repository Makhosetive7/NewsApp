import React, { useEffect, useState } from "react";
import axios from "axios";
import Report from "./Report";
import styled from "styled-components";

import { MediaQuiries } from "./MediaQuiries";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      const res = await axios.get(
        "https://api.spaceflightnewsapi.net/v3/reports"
      );
      console.log(res);
      setReports(res.data);
    };
    getReports();
  }, []);

  return (
    <Container>
    {/*<Navigation />*/}
    <div className="Banner">
      <h1>Reports</h1>
      <p>
        Get an overview of the latest Spaceflight news, from various sources!
        Easily link your users to the right websites
      </p>
    </div>
    <div className="ReportContainer">
      {reports &&
        reports.map((article, index) => (
          <div>
            <Report
              key={index}
              title={article.title}
              summary={article.summary}
              newsSite={article.newsSite}
              url={article.url}
              imageUrl={article.imageUrl}
              publishedAt={article.publishedAt}
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
  justify-content: center;
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
  .reportContainer {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    margin-top: 1rem;
  }
`;

export default Reports;
