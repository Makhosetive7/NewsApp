import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleFavoriteClick = (article) => {
    setFavorites([...favorites, article]);
    console.log(article);
    toast("Added article to favorites!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000, // Notification will close after 2 seconds
    });
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get(
        "https://api.spaceflightnewsapi.net/v3/articles"
      );
      console.log(response);
      setArticles(response.data);
    };
    getArticles();
  }, []);

//   const [mystyle , setMystyle] = useState({
//     color:"white",
//     backgroundColor:"black"
//   });

//   const [btntext , setBtntext] = useState("Enable Light Mode")

//  const  togglestyle = ()=>{
//     if(mystyle.color=="white"){
//       setMystyle({
//         color:"black",
//         backgroundColor:"white"
//       })
//       setBtntext("Enable Dark Mode")
//     }
//     else{
//       setMystyle({
//         color:"white",
//         backgroundColor:"black"
//       })
//       setBtntext("Enable Light Mode")
//     }
//   }

  return (
    <div className="Button">
    {/* <button onClick={togglestyle}> {btntext}</button> */}
  
    <Container>
      {/*<Navigation />*/}

      
      <div className="Banner">
        
        <h1>News</h1>
        <p>
          Get an overview of the latest Spaceflight news, from various sources!
          Easily link your users to the right websites
        </p>
      </div>

      <div className="ArticleContainer" >
        {articles &&
          articles.map((article, index) => (
            <div className="subContainer">
              <div className="Card_image">
                <img src={article.imageUrl} alt="" />
              </div>
              <div className="Card_details">
                <div className="news_source_title">
                  <h2>{`${article.newsSite.substring(0, 30)}`}</h2>
                </div>
                <div className="Summary">{`${article.summary.substring(
                  0,
                  200
                )}...`}</div>
                <div className="read_like_buttons">
                  <button className="read_More_button">
                    <a href={article.url}>Read more</a>
                  </button>
                  <button
                    className="favorite_button"
                    onClick={() => handleFavoriteClick(article)}
                  >
                    <AiOutlineHeart />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer />
    </Container>
    </div>
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
    background-color: #88b8f8;
    padding: 1rem;
    h1 {
      font-size: 40px;
      font-family: "Play", sans-serif;
      letter-spacing: 0.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 18px;
      font-family: "Play", sans-serif;
      margin-bottom: 1rem;
    }
  }
  .ArticleContainer {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 1rem;
    gap: 1rem;
    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .subContainer {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      margin-top: 1rem;
      margin-bottom: 1rem;
      .news_source_title{
        font-family: "Play", sans-serif;
        letter-spacing: 4px;
        word-spacing: 5px;
        margin-top: 20px;
        h2 {
          font-size: 20px;
          color: blue;
        }
      }
      .Card_details {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .Summary {
          padding: 1rem;
          font-size: 16px;
          font-family: "Play", sans-serif;
          word-spacing: 4px;
          color: blue;
        }
        .read_like_buttons{
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          margin-bottom: 1rem;
          .favorite_button {
            margin-left: 1rem;
            border-radius: 49%;
            padding: 0.5rem;
            font-size: 20px;
            color: blue;
            border: none;
            background-color: transparent;
            cursor: pointer;
          }
          a{
            text-decoration: none;
          }
        }
      }
      img {
        display: block;
        width: 100%;
        height: 30vh;
        transition: 0.5s ease;
        backface-visibility: hidden;
      }
      .read_More_button {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='-39 1 511 511.99897' xmlns='http://www.w3.org/2000/svg' fill='rgb(12, 27, 240)'%3E%3Cdefs/%3E%3Cpath d='M396.367188 369.371094c-20.109376-12.152344-48.074219-22.054688-80.933594-28.683594-22.523438-29.804688-58.25-49.101562-98.402344-49.101562s-75.878906 19.300781-98.402344 49.101562c-32.820312 6.625-60.757812 16.507812-80.863281 28.644531-2.296875 1.386719-4.445313 2.78125-6.476563 4.183594V210.027344l154.289063-78.820313c5.148437-2.628906 8.390625-7.925781 8.390625-13.707031s-3.242188-11.078125-8.390625-13.707031L31.289062 24.972656v-9.578125C31.289062 6.890625 24.394531 0 15.894531 0S.5 6.890625.5 15.394531v405c0 .097657.011719.191407.015625.289063C.507812 421.023438.5 421.359375.5 421.691406c0 26.851563 24.519531 50.773438 69.046875 67.355469C109.285156 503.847656 161.664062 512 217.03125 512c31.320312 0 64.132812-2.898438 92.390625-8.164062 77.734375-14.472657 124.144531-45.183594 124.144531-82.144532 0-13.613281-6.453125-33.738281-37.199218-52.320312zm6.410156 52.320312c0 3.476563-1.605469 7.300782-4.746094 11.277344-13.730469-11.992188-33.550781-22.308594-58.3125-30.285156-.878906-8.914063-2.714844-17.550782-5.398438-25.8125 45.046876 12.789062 68.457032 31.183594 68.457032 44.820312zm-64.121094 13.167969c13.710938 5.011719 25.171875 10.796875 33.773438 17.015625-11.59375 5.933594-26.414063 11.558594-44.304688 16.261719 5.058594-10.535157 8.621094-21.746094 10.53125-33.277344zM99.746094 376.867188c-2.6875 8.265624-4.523438 16.910156-5.402344 25.832031-24.761719 7.980469-44.699219 18.347656-58.421875 30.375-3.019531-3.890625-4.632813-7.734375-4.632813-11.382813-.003906-13.644531 23.40625-32.035156 68.457032-44.824218zM144.738281 117.5L31.289062 175.457031V59.542969zM61.496094 452.019531c8.648437-6.277343 20.171875-12.105469 33.878906-17.128906 1.90625 11.59375 5.457031 22.804687 10.535156 33.332031-9.0625-2.371094-17.632812-5.050781-25.617187-8.023437-6.894531-2.570313-13.179688-5.320313-18.796875-8.179688zm86.757812 24.554688c-15.300781-17.03125-23.726562-38.859375-23.726562-61.695313 0-51.007812 41.496094-92.503906 92.503906-92.503906s92.503906 41.496094 92.503906 92.503906c0 21.027344-7.304687 41.636719-20.570312 58.035156-.859375 1.0625-1.539063 2.210938-2.070313 3.402344-22.210937 3.140625-46.835937 4.898438-69.863281 4.898438-23.90625 0-47.125-1.59375-68.777344-4.640625zm0 0'/%3E%3Cpath d='M254.625 413.472656c-.558594-.042968-1.085938-.242187-1.535156-.574218-.394532-.296876-.707032-.6875-.910156-1.132813-3.507813-7.746094-12.628907-11.183594-20.375-7.675781-7.742188 3.507812-11.179688 12.628906-7.671876 20.375 2.335938 5.160156 5.96875 9.683594 10.503907 13.078125 5.164062 3.867187 11.292969 6.160156 17.730469 6.632812.382812.027344.765624.042969 1.144531.042969 7.988281 0 14.738281-6.171875 15.335937-14.265625.625-8.480469-5.742187-15.855469-14.222656-16.480469zm0 0M203.050781 376.625c-.558593-.039062-1.089843-.238281-1.53125-.570312-.398437-.296876-.710937-.6875-.914062-1.132813-3.507813-7.746094-12.625-11.183594-20.375-7.675781-7.742188 3.503906-11.179688 12.625-7.671875 20.371094 2.335937 5.160156 5.964844 9.683593 10.503906 13.082031 5.164062 3.867187 11.296875 6.160156 17.726562 6.632812.386719.027344.765626.042969 1.148438.042969 7.988281 0 14.738281-6.171875 15.335938-14.265625.625-8.480469-5.746094-15.859375-14.222657-16.484375zm0 0M255.039062 358.859375c-.558593-.039063-1.089843-.238281-1.535156-.574219-.394531-.292968-.707031-.6875-.910156-1.132812-3.507812-7.746094-12.628906-11.179688-20.375-7.675782-7.742188 3.507813-11.179688 12.628907-7.671875 20.375 2.335937 5.160157 5.96875 9.683594 10.503906 13.078126 5.164063 3.867187 11.292969 6.160156 17.726563 6.632812.386718.027344.765625.042969 1.144531.042969 7.988281 0 14.742187-6.171875 15.335937-14.265625.625-8.480469-5.742187-15.855469-14.21875-16.480469zm0 0'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 609.629 609.629' xmlns='http://www.w3.org/2000/svg' fill='rgb(12, 27, 240)' %3E%3Cdefs/%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath d='M579.142 419.214V354.96c.034-9.059-3.988-17.659-10.963-23.44l-47.967-40.042c-5.481-4.551-12.383-7.039-19.508-7.031h-5.69l-54.185-162.566h16.389c16.834 0 30.481-13.647 30.481-30.481s-13.647-30.481-30.481-30.481H101.604c-22.446 0-40.642 18.196-40.642 40.642 0 11.223 9.098 20.321 20.321 20.321h10.16v81.283h-20.32c-16.834 0-30.481 13.647-30.481 30.481v83.153c-12.135 4.29-20.267 15.741-20.321 28.612v12.03C8.186 361.729.053 373.18 0 386.051v60.962c0 16.834 13.647 30.481 30.481 30.481 0 39.28 31.843 71.123 71.123 71.123s71.123-31.843 71.123-71.123h294.651c-.041 33.771 23.671 62.914 56.744 69.741s66.388-10.545 79.722-41.571 3.011-67.152-24.702-86.45zm-104.52-131.719c-9.312 4.468-15.72 13.356-17.019 23.603l-82.543-82.533 18.218-18.218c3.85-3.987 3.795-10.324-.124-14.243s-10.256-3.974-14.243-.124l-50.802 50.802c-2.641 2.551-3.701 6.329-2.771 9.881s3.704 6.327 7.256 7.256c3.552.93 7.33-.129 9.881-2.771l18.218-18.218 96.524 96.524v46.595c0 11.223-9.098 20.321-20.321 20.321h-81.283c-11.223 0-20.321-9.098-20.321-20.321v-60.962c0-22.446-18.196-40.642-40.642-40.642h-81.283c-5.611 0-10.16-4.549-10.16-10.16v-60.962c0-16.834-13.647-30.481-30.481-30.481h-20.321V121.88H419.42zm-261.254 17.273h81.283c11.223 0 20.321 9.098 20.321 20.321v18.492l-162.566-27.098V203.164h20.321c5.611 0 10.16 4.549 10.16 10.16v60.962c0 16.835 13.647 30.482 30.481 30.482zM81.283 101.56c0-11.223 9.098-20.321 20.321-20.321h355.613c5.611 0 10.16 4.549 10.16 10.16s-4.549 10.16-10.16 10.16H81.283zm50.802 20.321v193.047h-20.321V121.881zM60.962 233.645c0-5.611 4.549-10.16 10.16-10.16h20.321v20.321H60.962zm0 30.481h30.481v50.802H60.962zm-20.32 81.283c0-5.611 4.549-10.16 10.16-10.16h90.6l173.57 28.927v21.875c.042 7.156 1.992 14.17 5.649 20.321H202.395c-14.788-.024-28.494-7.757-36.161-20.402-5.531-9.3-13.411-16.982-22.851-22.272-9.395-5.322-20.008-8.122-30.806-8.128H40.642zm60.962 182.887c-28.057 0-50.802-22.745-50.802-50.802s22.745-50.802 50.802-50.802 50.802 22.745 50.802 50.802c-.034 28.043-22.759 50.768-50.802 50.802zm368.822-71.123H169.678c-9.078-30.003-36.729-50.524-68.075-50.524s-58.996 20.522-68.075 50.524H30.48c-5.611 0-10.16-4.549-10.16-10.16v-60.962c0-5.611 4.549-10.16 10.16-10.16h82.096c7.293.009 14.46 1.899 20.808 5.487 6.359 3.556 11.668 8.725 15.393 14.987 11.35 18.778 31.675 30.274 53.616 30.329h234.502c22.446 0 40.642-18.196 40.642-40.642v-71.123c0-5.611 4.549-10.16 10.16-10.16h13.005c2.367 0 4.66.819 6.492 2.317l48.008 40.073c2.326 1.918 3.656 4.788 3.617 7.803v54.46c-18.055-5.412-37.521-3.419-54.104 5.539-16.582 8.957-28.919 24.145-34.289 42.212zm68.074 71.123c-28.057 0-50.802-22.745-50.802-50.802s22.745-50.802 50.802-50.802 50.802 22.745 50.802 50.802c-.034 28.043-22.759 50.768-50.802 50.802z'/%3E%3Cpath d='M538.5 447.013c-16.834 0-30.481 13.647-30.481 30.481s13.647 30.481 30.481 30.481 30.481-13.647 30.481-30.481-13.647-30.481-30.481-30.481zm0 40.641c-5.611 0-10.16-4.549-10.16-10.16s4.549-10.16 10.16-10.16 10.16 4.549 10.16 10.16-4.549 10.16-10.16 10.16zM101.604 447.013c-16.834 0-30.481 13.647-30.481 30.481s13.647 30.481 30.481 30.481 30.481-13.647 30.481-30.481-13.647-30.481-30.481-30.481zm0 40.641c-5.611 0-10.16-4.549-10.16-10.16s4.549-10.16 10.16-10.16 10.16 4.549 10.16 10.16-4.549 10.16-10.16 10.16z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: calc(0% - 100px), calc(100% - 12px);
        background-color: whitesmoke;
        background-size: 30px 30px;
        color: #88b8f8;
        cursor: pointer;
        display: block;
        position: relative;
        border: none;
        font-size: 0.7rem;
        font-family: "Abril Fatface", cursive;
        padding: 1rem;
        width: 10rem;
        text-align: center;
        overflow: hidden;
        text-shadow: 0 0 1px rgb(0 0 0 / 20%), 0 1px 0 rgb(0 0 0 / 20%);
        white-space: nowrap;
        transition: background-position 2s ease;

        &:hover {
          background-position: calc(25% - 30px), calc(100% + 100px);
        }
      }
    }
  }
`;

export default Articles;
