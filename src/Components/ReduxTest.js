import React, { Component } from "react";

import { connect } from "react-redux";

class ReduxTest extends Component {
  render() {
    return <h1>Test-{this.props.games}</h1>;
  }
}
//games
//console.log(state.game.games);
const mapStateToProps = state => ({
  games: state.game.games
});
export default connect(mapStateToProps)(ReduxTest);
