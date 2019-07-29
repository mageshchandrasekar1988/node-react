import React, { Component } from "react";
import { Button, Image, Form } from "semantic-ui-react";
import classnames from "classnames";
import { connect } from "react-redux";
import { saveGame, fecthGame, updateGame } from "../Actions/actions";
import { Redirect } from "react-router-dom";

class GameForm extends Component {
  state = {
    id: this.props.games ? this.props.games.id : "",
    title: this.props.games ? this.props.games.title : "",
    cover: this.props.games ? this.props.games.url : "",
    errors: {},
    lodaing: false,
    done: false
  };

  componentWillReceiveProps = (nextProps, prevState) => {
    this.setState({
      id: nextProps.games.id,
      title: nextProps.games.title,
      cover: nextProps.games.url
    });
  };
  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.fecthGame(this.props.match.params.id);
    }
  };
  onHandelChange1 = e => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };
  onHandelSubmit = e => {
    e.preventDefault();

    //validation
    let errors = {};
    if (this.state.title === "") errors.title = "can't be empty";
    if (this.state.cover === "") errors.cover = "can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid === true) {
      const { id, title, cover, lodaing } = this.state;
      this.setState({ lodaing: true });
      if (id) {
        this.props.updateGame({ id, title, cover }).then(
          () => {
            this.setState({ done: true });
          },
          err =>
            err.response
              .json()
              .then(({ errors }) => this.setState({ errors, lodaing: false }))
        );
      } else {
        this.props.saveGame({ title, cover }).then(
          () => {
            this.setState({ done: true });
          },
          err =>
            err.response
              .json()
              .then(({ errors }) => this.setState({ errors, lodaing: false }))
        );
      }
    }
  };
  render() {
    const { title, cover, errors, lodaing, done } = this.state;
    return (
      <div>
        {done ? (
          <Redirect to="/games" />
        ) : (
          <form
            onSubmit={this.onHandelSubmit}
            className={classnames("ui", "form", { lodaing: lodaing })}
          >
            <h1>Add new game</h1>
            {!!errors.global && (
              <div className="ui negative message">
                <p>{errors.global}</p>
              </div>
            )}
            <div className={classnames("field", { error: !!errors.title })}>
              <label>Title:{title}</label>
              <input
                placeholder="First Name"
                id="title"
                name="title"
                value={title}
                onChange={this.onHandelChange1}
              />
              <span>{errors.title}</span>
            </div>
            <div className={classnames("field", { error: !!errors.cover })}>
              <label>Cover URL</label>
              <input
                placeholder="Last Name"
                id="cover"
                name="cover"
                value={cover}
                onChange={this.onHandelChange1}
              />
              <span>{errors.cover}</span>
            </div>
            <Form.Field>
              {cover !== "" && <Image src={cover} size="small" alt="cover" />}
            </Form.Field>
            <Button type="submit" primary>
              Submit
            </Button>
          </form>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  //console.log(state);
  if (props.match.params.id) {
    const a = state.game.games.find(
      item => item.id === parseInt(props.match.params.id)
    );
    return {
      games: a
    };
  }
  return { games: null };
};
export default connect(
  mapStateToProps,
  { saveGame, fecthGame, updateGame }
)(GameForm);
