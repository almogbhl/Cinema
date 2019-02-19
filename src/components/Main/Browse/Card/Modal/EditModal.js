import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { lighten, darken } from "polished";
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
    width: "60rem",
    height: "60rem"
  }
};

class CreateModal extends Component {
  state = {
    modalIsOpen: false,
    Title: "",
    Year: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Plot: "",
    Poster: "",
    imdbID: "",
    TitleValid: true,
    YearValid: true,
    RuntimeValid: true,
    GenreValid: true,
    DirectorValid: true,
    PlotValid: true,
    PosterValid: true,
    imdbIDValid: true,
    errMsg: "",
    errField: "",
    isValid: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active) {
      if (this.props.active === true) {
        this.setState({ modalIsOpen: true });
      }
    }

    if(this.props.data !== prevProps.data) {
      this.updateMovieData();
    }
  }

  componentDidMount() {
    this.updateMovieData();
  }

  updateMovieData = () => {
    const {
      Title,
      Year,
      Runtime,
      Genre,
      Director,
      Plot,
      Poster,
      imdbID
    } = this.props.data;

    this.setState({
      Title,
      Year,
      Runtime,
      Genre,
      Director,
      Plot,
      Poster,
      imdbID
    });
  }

  hide_errors = () => {
    this.setState({ errMsg: "", errField: "" });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    this.props.isClose("0");
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validate_form = event => {
    const value = event.target.value;
    const name = event.target.name;

    const nameValid = `${name}Valid`;
    if (!value.length > 0) {
      this.setState({
        [nameValid]: false,
        errField: name,
        errMsg: `The ${name} is an empty string!`
      });
    } else {
      this.setState({
        [nameValid]: true
      });
    }

    if (name === "Year") {
      const Year = parseInt(value);

      if (isNaN(Year)) {
        this.setState({
          YearValid: false,
          errField: name,
          errMsg: `The year "${value}" is not a Number!`
        });
      }
      if (Year > 2019) {
        this.setState({
          YearValid: false,
          errField: name,
          errMsg: `The year ${value} is not a valid number!`
        });
      } else if (Year < 1915) {
        this.setState({
          YearValid: false,
          errField: name,
          errMsg: `The year ${value} is not a valid valid!`
        });
      }
    }
  };

  submit_form = e => {
    const {
      TitleValid,
      YearValid,
      RuntimeValid,
      GenreValid,
      DirectorValid,
      PosterValid,
      PlotValid
    } = this.state;

    if (
      TitleValid === true &&
      YearValid === true &&
      RuntimeValid === true &&
      GenreValid === true &&
      DirectorValid === true &&
      PosterValid === true &&
      PlotValid === true
    ) {
      this.setState({ isValid: true });
      this.onFormSubmit("true");
    }
    e.preventDefault();
  };

  onFormSubmit = isValid => {
    if (isValid === "true") {
      this.closeModal();

      const movieData = { ...this.state };

      delete movieData.errMsg;
      delete movieData.errField;
      delete movieData.isValid;
      delete movieData.modalIsOpen;

      this.props.updateData(movieData);
    }

    this.setState({ isValid: false });
  };

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Create Modal"
      >
        <Main>
          <Title>Edit Movie</Title>
          <Form>
            <Label>ID</Label>
            <Box>
              <Input name="imdbID" type="text" value={this.state.imdbID} />
            </Box>
            <Label>Title</Label>
            <Box>
              <Input
                onChange={this.handleInputChange}
                name="Title"
                type="text"
                error_styled={this.state.errField === "Title"}
                onBlur={this.validate_form}
                onFocus={this.hide_errors}
                value={this.state.Title}
              />
            </Box>
            <VLBox>
              <Label mt="1rem">Year</Label>
              <ExpandedInput
                onChange={this.handleInputChange}
                name="Year"
                type="text"
                error_styled={this.state.errField === "Year"}
                onBlur={this.validate_form}
                onFocus={this.hide_errors}
                value={this.state.Year}
              />
            </VLBox>
            <VLBox>
              <Label mt="1rem">Runtime</Label>
              <ExpandedInput
                onChange={this.handleInputChange}
                name="Runtime"
                type="text"
                error_styled={this.state.errField === "Runtime"}
                onBlur={this.validate_form}
                onFocus={this.hide_errors}
                value={this.state.Runtime}
              />
            </VLBox>
            <VLBox>
              <Label mt="1rem">Genre</Label>
              <ExpandedInput
                onChange={this.handleInputChange}
                name="Genre"
                type="text"
                error_styled={this.state.errField === "Genre"}
                onBlur={this.validate_form}
                onFocus={this.hide_errors}
                value={this.state.Genre}
              />
            </VLBox>
            <VLBox>
              <Label mt="1rem">Director</Label>
              <ExpandedInput
                onChange={this.handleInputChange}
                name="Director"
                type="text"
                error_styled={this.state.errField === "Director"}
                onBlur={this.validate_form}
                onFocus={this.hide_errors}
                value={this.state.Director}
              />
            </VLBox>
            <VLBox>
              <Label mt="1rem">Poster</Label>
              <ExpandedInput
                onChange={this.handleInputChange}
                name="Poster"
                type="text"
                error_styled={this.state.errField === "Poster"}
                onBlur={this.validate_form}
                onFocus={this.hide_errors}
                value={this.state.Poster}
              />
            </VLBox>
            <VLBox>
              <Label mt="1rem">Summery</Label>
              <Description
                onChange={this.handleInputChange}
                rows="6"
                name="Plot"
                error_styled={this.state.errField === "Plot"}
                onBlur={this.validate_form}
                onFocus={this.hide_errors}
                value={this.state.Plot}
              />
            </VLBox>
            <ErrorMsg show={this.state.isValid !== true}>
              {this.state.errMsg}
            </ErrorMsg>
            <Spacer h="1rem" />
            <Submit onClick={this.submit_form}>Update</Submit>
          </Form>
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

export default connect(
  mapStateToProps,
  null
)(CreateModal);

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 3rem;
  color: grey;
`;

// const ButtonBox = styled.div`
//   display: flex;
// `;

// const Button = styled.button`
//   padding: 1rem;
//   font-size: 1.5rem;
//   width: 12rem;
//   border-radius: 4px;
//   border: none;
//   margin-right: 1rem;
//   color: white;
//   background-color: #c1c1c1;
//   cursor: pointer;

//   &:last-child {
//     background-color: #f7b239;
//     margin-right: 0;
//   }
// `;

// const Error = styled.div`
//   margin: 1rem;
// `;

// const Msg = styled.p`
//   color: red;
//   font-weight: bold;
//   font-size: 1.5rem;
//   text-align: center;
// `;

const ErrorMsg = styled.h1`
  color: red;
  border: red dashed 1px;
  border-radius: 6px;
  visibility: ${props => (props.show === true ? "visible" : "hidden")};
  align-self: center;
  text-align: center;
  padding: 0.6rem;
  width: 100%;
  /* margin-bottom:1rem; */
  font-size: 1.6rem;
  font-family: "Arial";
`;
const Box = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;
const VBox = styled(Box)`
  flex-direction: column;
`;
const VLBox = styled(VBox)`
  align-items: flex-start;
`;

const Form = styled.form`
  /* border:cyan solid 1px; */
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 40rem;
  min-width: 40rem;
  background: white;
  border-radius: 6px;
  box-shadow: inset 0px 0px 14px 1px rgba(133, 133, 133, 1);
`;
const Label = styled.label`
  margin-top: 1rem;
  color: coral;
  font-size: 2rem;
  font-family: "Arial";
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  font-size: 2rem;
  font-family: "Arial";
  border-radius: 4px;
  padding: 1rem 2rem;
  border: 2px ${p => (p.error_styled ? "red" : "transparent")} solid;
  outline: none;
  background-color: ${p =>
    p.error_styled ? lighten(0.4, "red") : "lightgray"};
  color: ${p => (p.error_styled ? "red" : "slategray")};
  &::placeholder {
    color: ${p => (p.error_styled ? "red" : "slategray")};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: slategray;
  }
  &:focus {
    border: darkgray 2px solid;
    background-color: lightgray;
    color: slategray;
  }
`;
const ExpandedInput = styled(Input)`
  width: 100%;
`;

const Spacer = styled.div`
  width: ${p => p.w || 0};
  height: ${p => p.h || 0};
  display: ${p => (p.show === false ? "none" : "block")};
`;
const Description = styled.textarea`
  width: 100%;
  font-size: 2rem;
  font-family: "Arial";
  border-radius: 4px;
  padding: 1rem 2rem;
  border: 2px ${p => (p.error_styled ? "red" : "transparent")} solid;
  outline: none;
  background-color: ${p =>
    p.error_styled ? lighten(0.4, "red") : "lightgray"};
  color: slategray;
  &::placeholder {
    color: ${p => (p.error_styled ? "red" : "slategray")};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: slategray;
  }
  &:focus {
    border: darkgray 2px solid;
    background-color: lightgray;
  }
`;

const Submit = styled.button`
  width: 100%;
  outline-style: none;
  border-style: none;
  background: deeppink;
  text-transform: uppercase;
  color: white;
  font-size: 2.2rem;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Yanone Kaffeesatz", sans-serif;

  &:hover {
    background: ${darken(0.1, "deeppink")};
  }
  &:active {
    background: ${lighten(0.1, "deeppink")};
  }
  border: 2px transparent solid;
  &:focus {
    border: ${darken(0.2, "deeppink")} 2px solid;
  }
`;
