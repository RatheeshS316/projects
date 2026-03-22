import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUserName, selectUserPhoto } from "./userSlice"; // ✅ fixed path

const Header = () => {
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  return (
    <Nav>
      <Logo src="/images/logo.svg" alt="LinkedIn" />
      {!userName ? (
        <LoginContainer>
          <Login>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <Navmenu>
            <a>
              <img src="/images/home-icon.svg" alt="Home" />
              <span>HOME</span>
            </a>
            <a>
              <img src="/images/search-icon.svg" alt="Search" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" alt="Watchlist" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" alt="Originals" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" alt="Movies" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" alt="Series" />
              <span>SERIES</span>
            </a>
            <a>
              <img src="/images/kid.svg" alt="Kids" />
              <span>KIDS</span>
            </a>
          </Navmenu>
          <UserImg src={userPhoto || "/images/logo.jpg"} alt={userName || "User"} />
        </>
      )}
    </Nav>
  );
};

export default Header;

// ✅ Styled Components
const Nav = styled.nav`
  background-color: #070d1f;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  position: relative;
  z-index: 2;
`;

const Logo = styled.img`
  width: 80px;
  cursor: pointer;
`;

const Navmenu = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 30px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;
    color: white;

    img {
      height: 20px;
      margin-right: 6px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.5px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background-color: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 250ms ease, opacity 250ms ease;
      }
    }

    &:hover span:after {
      opacity: 1;
      transform: scaleX(1);
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
