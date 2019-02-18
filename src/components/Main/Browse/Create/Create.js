import React, { Component } from "react";
import styled from "styled-components";
import CreateModal from './CreateModal/CreateModal';


class Create extends Component {
  state = {
    activeCreateModal: false
  }
  onClickCreate = () => {
    this.setState({ activeCreateModal: true }, () => {
      this.setState({ activeCreateModal: false });
    });
  };
  render() {
    return (
     <Box>
       <Button onClick={this.onClickCreate}>Add New Movie</Button>
       <CreateModal active={this.state.activeCreateModal}/>
     </Box>
    );
  }
}

export default Create;


const Box = styled.div `
margin-top: 3rem;
margin-left: 1rem;
width: 10rem;
background-color: white;
`

const Button = styled.button `
color: black;
font-size: 2rem;
`