import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { delete_item } from "../Card.action";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "8px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40rem",
    height: "36rem"
  }
};

class DeleteModal extends Component {
  state = {
    modalIsOpen: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active) {
      if (this.props.active === true) {
        this.setState({ modalIsOpen: true });
      }
    }
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    this.props.isClose("0");
  };

  deleteItem = () => {
    this.setState({ modalIsOpen: false });
    const index = this.props.index;
    console.log(index)
    this.props.do_delete_item(index);
  };

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <Main>
          <Box>
            <WarningBox>
              <Warning>X</Warning>
            </WarningBox>
          </Box>
          <Box>
            <Title>Are you sure?</Title>
            <Msg>
              Do you really want to delete these records? This process cannot be
              undone.
            </Msg>
            <ButtonBox>
              <Button onClick={this.closeModal}>Cancel</Button>
              <Button onClick={this.deleteItem}>Delete</Button>
            </ButtonBox>
          </Box>
        </Main>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    do_delete_item: index => dispatch(delete_item(index))
  };
}
export default connect(
  null,
  mapDispatchToProps
)(DeleteModal);

const Main = styled.div`
  display: flex;

  height: 100%;
  flex-direction: column;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-basis: 45%;
  &:last-child {
    flex-basis: 55%;
  }
`;
const Title = styled.h3`
  font-size: 3rem;
  color: grey;
`;
const Msg = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: lightgrey;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const Button = styled.button`
  padding: 1rem;
  font-size: 1.5rem;
  width: 12rem;
  border-radius: 4px;
  border: none;
  margin-right: 1rem;
  color: white;
  background-color: #c1c1c1;
  cursor: pointer;

  &:last-child {
    background-color: #f15e5e;
    margin-right: 0;
  }
`;

const WarningBox = styled.div`
  width: 10rem;
  height: 10rem;
  position: relative;
  background-color: transparent;
  border: 3px solid #f15e5e;
  border-radius: 50%;
`;

const Warning = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  font-size: 6rem;
  font-weight: 100;
`;
