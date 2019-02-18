import React, { Component } from "react";
import styled from "styled-components";
import GlobalStyle from "./styled/global.styles";
import TopBar from "./components/TopBar/TopBar";
import Browse from "./components/Main/Browse/Browse";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faEdit, faTrash, faTimes);

class App extends Component {
  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <TopBar />
        <Browse />
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div``;
