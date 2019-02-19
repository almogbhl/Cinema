import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Card from "./Card/Card";
import Create from "./Create/Create";
import { fetchMovies } from "./Browse.action";

class Browse extends Component {
  componentDidMount() {
    this.props.do_fetchMovies();
  }

  horizonFlip = num => {
    const innerCard = this.refs.cardInner;
    innerCard.style.transform = `rotateY(${num}deg)`;
  };

  render() {
    if (this.props.movies_list === null) {
      return (
        <LoadingBox>
          <Loader type="Oval" color="#00BFFF" height="100" width="100" />
        </LoadingBox>
      );
    } else {
      return (
        <Main>
          <Create />
          <Ul>
            {this.props.movies_list.map((item, i) => (
              <Li key={i}>
                <Card index={i} data={item} />
              </Li>
            ))}
          </Ul>
        </Main>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    movies_list: state.main.movies_list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    do_fetchMovies: () => dispatch(fetchMovies())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2.5rem;
  @media (min-width: 1127px) {
    padding: 0 5rem;
  }
  @media (min-width: 1439px) {
    padding: 0 8rem;
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
    margin: 0 auto;
  @media (min-width: 1439px) {
    justify-content: flex-start;
  }
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (min-width: 550px) {
    width: calc(50% - 1.3rem);
  }
  @media (min-width: 900px) {
    width: calc(33.333% - 1.3rem);
  }
  @media (min-width: 1127px) {
    width: calc(25% - 1.3rem);
  }
  @media (min-width: 1439px) {
    width: calc(20% - 1.3rem);
  }
`;

const LoadingBox = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
