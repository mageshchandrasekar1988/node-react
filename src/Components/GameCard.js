import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class GameCard extends Component {
  state = {};
  render() {
    const { game } = this.props;
    return (
      <div className="ui card">
        <div className="image">
          <img src={game.url} alt="Game Cover" />
        </div>
        <div className="content">
          <div className="header">{game.title}</div>
        </div>
        <div className="extra content">
          <div className="ui two button">
            <Link to={`/game/${game.id}`} className="ui basic button green">
              Edit
            </Link>
            <div
              className="ui basic button red"
              onClick={() => this.props.deleteGame(game.id)}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired
};

export default GameCard;
