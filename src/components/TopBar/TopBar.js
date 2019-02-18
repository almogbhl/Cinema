import React, { Component } from "react";
import styled from "styled-components";

class TopBar extends Component {
  LogoUrl =
    "https://www.shareicon.net/data/2016/08/19/817548_cinema_512x512.png";

  render() {
    return (
      <Header>
        <LogoBox>
          <LogoImg src={this.LogoUrl} />
          <Title>Cinema</Title>
        </LogoBox>
      </Header>
    );
  }
}

export default TopBar;

const Header = styled.header`
  padding: 0px 5%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1.2rem 1.5rem 1.2rem 0;
`;
const Title = styled.h1`
  color: white;
  font-family: "Raleway", sans-serif;
  font-size: 3rem;
  margin-left: 1rem;
`;

const LogoImg = styled.img`
  height: 5rem;
`;
