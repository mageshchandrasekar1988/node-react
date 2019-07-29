import React, { Component, Fragment } from "react";

class FirstApp extends Component {
  state = {
    items: ["A", "B", "C", "D"],
    item: "test"
  };

  componentDidMount() {
    this.setState({
      item: "Rajesh Magesh"
    });
  }
  render() {
    const { Test, Test1 } = this.props,
      { items, item } = this.state;
    console.log(item);
    return (
      <Fragment>
        <p>Test 1 {Test}</p>
        <p>Test 2 {Test1}</p>
        <p>{item}</p>
        {items.map((i, index) => (
          <p key={index}>{i}</p>
        ))}
      </Fragment>
    );
  }
}

export default FirstApp;
