import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GamesList from "./GameList";
import { fecthGames, deleteGame } from "../Actions/actions";
class GamePage extends Component {
  state = {};
  componentDidMount() {
    this.props.fecthGames();
  }
  render() {
    const { games, deleteGame } = this.props;
    return (
      <Fragment>
        <h1>Games List </h1>
        <GamesList games={games} deleteGame={deleteGame} />
      </Fragment>
    );
  }
}
GamePage.propTypes = {
  games: PropTypes.array.isRequired,
  fecthGames: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  return {
    games: state.game.games
  };
};
export default connect(
  mapStateToProps,
  { fecthGames, deleteGame }
)(GamePage);
