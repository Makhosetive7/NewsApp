import React from "react";
import styled from "styled-components";

const LoginPage = () => {
  return (
    <Container>
      <div className="banner">
        <img
          src="https://images.pexels.com/photos/5998828/pexels-photo-5998828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="form">
        <div>Create account to save Bookmarks</div>
        <form class="login-form">
          <div class="form-input-material">
            <input
              type="text"
              name="username"
              id="username"
              placeholder=" "
              autocomplete="off"
              class="form-control-material"
              required
            />
            <label for="username">Username</label>
          </div>
          <div class="form-input-material">
            <input
              type="password"
              name="password"
              id="password"
              placeholder=" "
              autocomplete="off"
              class="form-control-material"
              required
            />
            <label for="password">Password</label>
          </div>
          <button type="submit" class="btn btn-primary btn-ghost">
            Login
          </button>
        </form>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 50vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;

  .banner {
    border: 1px solid pink;
    img {
      width: 100%;
      height: 87vh;
    }
  }

  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 50px 40px;
      color: white;
      background: #88b8f8;
      border-radius: 10px;
      h1 {
        margin: 0 0 24px 0;
      }

      .form-input-material {
        margin: 12px 0;
      }

      .btn {
        width: 100%;
        margin: 18px 0 9px 0;
      }
    }

    .btn {
      padding: 8px 20px;
      border-radius: 0;
      overflow: hidden;

      &:hover {
        background: transparent;
        box-shadow: 0 0 20px 10px hsla(204, 70%, 53%, 0.5);

        &::before {
          transform: translateX(100%);
        }
      }
    }

  }
`;
export default LoginPage;
