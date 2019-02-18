import React, { Component } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteModal from "./Modal/DeleteModal";
import EditModal from "./Modal/EditModal";

class Card extends Component {
  state = {
    movieData: [],
    activeEditModal: false,
    activeDeleteModal: false,
  };

  componentDidMount() {
    this.setState({ movieData: this.props.data });
  }

  componentDidUpdate(prevProps) {
    if(this.props.data !== prevProps.data) {
      this.setState({ movieData: this.props.data });
    }
  }

  onClickDelete = () => {
    this.setState({ activeDeleteModal: true }, () => {
      this.setState({ activeDeleteModal: false });
    });
  };
  onClickEdit = () => {
    this.setState({ activeEditModal: true }, () => {
      this.setState({ activeEditModal: false });
    });
  };

  updateMovieData = (data) => {
    this.setState({ movieData: data });
  }

  horizonFlip = num => {
    const innerCard = this.refs.cardInner;
    innerCard.style.transform = `rotateY(${num}deg)`;
  };

  render() {
    const {
      Title,
      Year,
      Runtime,
      Genre,
      Director,
      Plot,
      Poster,
      imdbID
    } = this.state.movieData;

    let posterImg = "";
    if (Poster === "N/A") {
      posterImg =
        "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png";
    } else {
      posterImg = Poster;
    }

    if (this.state.movieData.length === 0) {
      return <Loader type="Oval" color="#00BFFF" height="100" width="100" />;
    } else {
      return (
        <FlipCard
          onMouseOver={() => this.horizonFlip("180")}
          onMouseLeave={() => this.horizonFlip("0")}
        >
          <FlipCardInner ref="cardInner">
            <FlipCardFront>
              <PosterImg src={posterImg} alt="img" />
            </FlipCardFront>
            <FlipCardBack>
              <ContentBox>
                <PopcornIcon src="http://icons.iconarchive.com/icons/grafikartes/flat-retro-modern-2/256/iMovie-icon.png" />
                <MovieTitle>{Title}</MovieTitle>
                <ContentList>
                  <Item>{Year} /</Item>
                  <Item>{Runtime} /</Item>
                  <Item>{imdbID}</Item>
                </ContentList>
                <SummeryBox>
                  <SummeryTitle>Summery</SummeryTitle>
                  <SummeryContent>{Plot}</SummeryContent>
                </SummeryBox>
                <MovieGenre>Genre: {Genre}</MovieGenre>
                <DirectorName>Director: {Director}</DirectorName>
                <OptionBox>
                  <EditBox onClick={this.onClickEdit}>
                    <FontAwesomeIcon icon="edit" size="2x" />
                  </EditBox>
                  <DeleteBox onClick={this.onClickDelete}>
                    <FontAwesomeIcon icon="trash" size="2x" />
                  </DeleteBox>
                </OptionBox>
              </ContentBox>
            </FlipCardBack>
          </FlipCardInner>
          <DeleteModal
            index={this.props.index}
            active={this.state.activeDeleteModal}
            isClose={turnCrad => this.horizonFlip(turnCrad)}
          />
          <EditModal
            data={this.props.data}
            active={this.state.activeEditModal}
            updateData={data => this.updateMovieData(data)}
            isClose={turnCrad => this.horizonFlip(turnCrad)}
          />
        </FlipCard>
      );
    }
  }
}

export default Card;

const FlipCard = styled.div`
  background-color: transparent;
  width: 27rem;
  height: 40rem;
  perspective: 1000px;
  margin: 1rem;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #bbb;
  color: black;
  z-index: 2;
`;
const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #351d1d;
  color: white;
  transform: rotateY(180deg);
  z-index: 1;
`;

const PosterImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PopcornIcon = styled.img`
  margin: 2rem 0;
  width: 7rem;
  height: 7rem;
`;

const MovieTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  letter-spacing: 1.5px;
`;

const ContentList = styled.ul`
  display: flex;
  margin-top: 0.5rem;
`;
const Item = styled.li`
  margin-left: 0.6rem;
  font-size: 1.2rem;
  font-family: "Open Sans", sans-serif;
  color: #e7e7e7;
`;

const SummeryBox = styled.div`
  margin-top: 2rem;
`;
const SummeryTitle = styled.h3`
  margin: 1rem 0;
  font-size: 1.8rem;
  color: lightgray;
`;

const SummeryContent = styled.p`
  padding: 0 0.5rem;
  font-size: 1.2rem;
`;
const MovieGenre = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
`;
const DirectorName = styled(MovieGenre)``;

const OptionBox = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  height: 4.5rem;
  align-items: center;
  justify-content: space-between;
`;
const EditBox = styled.div`
  flex-basis: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 1s;
  background-color: lightblue;
  &:hover {
    border-color: white;
    background-color: transparent;
  }
`;
const DeleteBox = styled(EditBox)`
  background-color: tomato;
  &:hover {
    background-color: transparent;
  }
`;
