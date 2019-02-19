import React, { Component } from "react";
import styled from "styled-components";
import CreateModal from "./CreateModal/CreateModal";

class Create extends Component {
  state = {
    activeCreateModal: false
  };
  onClickCreate = () => {
    this.setState({ activeCreateModal: true }, () => {
      this.setState({ activeCreateModal: false });
    });
  };
  render() {
    return (
      <Box>
        <Button onClick={this.onClickCreate}>Add New Movie</Button>
        <CreateModal active={this.state.activeCreateModal} />
      </Box>
    );
  }
}

export default Create;

const Box = styled.div`
  margin-top: 3rem;
  align-self: center;
`;

const Button = styled.button`
  padding: 1rem;
  font-size: 1.5rem;
  width: 15rem;
  border-radius: 4px;
  border: none;
  margin-right: 1rem;
  color: white;
  background-color: #f7b239;
  cursor: pointer;
`;
