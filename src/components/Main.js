import React, { Component } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";
import "./App.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: "buy",
    };
  }

  render() {
    let content;
    if (this.state.currentForm === "buy") {
      content = (
        <BuyForm
          ethBalance={this.props.ethBalance}
          tokenBalance={this.props.tokenBalance}
          buyTokens={this.props.buyTokens}
        />
      );
    } else {
      content = (
        <SellForm
          ethBalance={this.props.ethBalance}
          tokenBalance={this.props.tokenBalance}
          sellTokens={this.props.sellTokens}
        />
      );
    }
    return (
      <div id="content" className="black">
        <div className="d-flex justify-content-between mb-3">
          <button
            className="btn btn-light"
            onClick={(event) => {
              this.setState({ currentForm: "buy" });
            }}
          >
            buy
          </button>
          <span className="text-muted">&lt; &gt;</span>
          <button
            className="btn btn-light"
            onClick={(event) => {
              this.setState({ currentForm: "Sell" });
            }}
          >
            Sell
          </button>
        </div>
        <div className="boxbacground">
          <div className="card-body">{content}</div>
        </div>
      </div>
    );
  }
}

export default Main;
