import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { create_movie } from "../Create.action";
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
    width: "30rem",
    height: "20rem"
  }
};

class CreateModal extends Component {
  state = {
    modalIsOpen: false,
    title: "",
    errMsg: ""
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
  };

  handleInputChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  checkValidation = requestedMovie => {
    const { movies_list } = this.props;

    let moviesName = [];
    requestedMovie = requestedMovie.toLowerCase();

    movies_list.map(movie => {
      movie = movie.Title.toLowerCase();
      moviesName.push(movie);
    });

    const checkDuplicate = moviesName.indexOf(requestedMovie) === -1;

    if (checkDuplicate === true) {
      this.setState({
        errMsg: "",
        modalIsOpen: false
      });
      this.props.do_create_movie(requestedMovie);
    } else {
      this.setState({
        errMsg: "The movie is already exist!"
      });
    }
  };

  submit_form = e => {
    const movie_name = this.state.title;
    this.checkValidation(movie_name);
    e.preventDefault();
  };

  render() {
    const ErrMsg = this.state.errMsg;
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Create Modal"
      >
        <Main>
          <Title>Title</Title>
          <Input type="search" onChange={this.handleInputChange} />
          <Error>
            <Msg>{ErrMsg}</Msg>
          </Error>
          <ButtonBox>
            <Button onClick={this.closeModal}>Cancel</Button>
            <Button onClick={this.submit_form}>Create</Button>
          </ButtonBox>
        </Main>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const { errMsg, movies_list } = state.main;

  return {
    errMsg,
    movies_list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    do_create_movie: movie => dispatch(create_movie(movie))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateModal);

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 3rem;
  color: grey;
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
    background-color: #f7b239;
    margin-right: 0;
  }
`;

const Input = styled.input``;

const Error = styled.div`
  margin: 1rem;
`;

const Msg = styled.p`
  color: red;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
`;
