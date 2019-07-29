import React, { Component } from "react";

class TestForm extends Component {
  state = { title: "", username: "", pwd: "" };
  onHandelChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onHandelSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    const { title, username, pwd } = this.state;
    //console.log(this.state);
    return (
      <form onSubmit={this.onHandelSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.onHandelChange}
        />
        <br />
        <hr />
        <input
          type="text"
          name="username"
          value={username}
          onChange={this.onHandelChange}
        />
        <br />
        <hr />
        <input
          type="text"
          name="pwd"
          value={pwd}
          onChange={this.onHandelChange}
        />
        <br />
        <hr />
        <button>Submit</button>
      </form>
    );
  }
}

export default TestForm;
