import React, { Component, Fragment } from "react";
import GameCard from "./GameCard";
import PropTypes from "prop-types";
class GameList extends Component {
  state = {};
  render() {
    const emptyMessage = <p>There is no game collection are available.</p>;
    //const gamesList = {(games.map(item => (<div className="ui four cards">sss</div>))}
    const { games } = this.props;

    return (
      <Fragment>
        {games.length === 0 ? (
          emptyMessage
        ) : (
          <div className="ui four cards">
            {games.map(game => (
              <GameCard
                game={game}
                key={game.id}
                deleteGame={this.props.deleteGame}
              />
            ))}
          </div>
        )}
      </Fragment>
    );
  }
}
GameList.propTypes = {
  games: PropTypes.array.isRequired,
  deleteGame: PropTypes.func.isRequired
};
export default GameList;
