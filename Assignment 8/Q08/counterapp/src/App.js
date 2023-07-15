import { Component } from "react";
import "./App.css";
class CounterApp extends Component {
  state = { count: 0 };


  onIncrement = () => {
    this.setState((prevstate) => ({ count: prevstate.count + 1 }));
  };

  onDecrement = () => {
    this.setState((prevstate) => ({ count: prevstate.count - 1 }));
  };

 

  render() {
    const { count } = this.state;
    return (
      <div className="app-container">
        <div className="content-container">
          <p className="counter">{count}</p>
          <div>
            <button
              className="increase-button"
              type="button"
              onClick={this.onIncrement}
            >
              Increment
            </button>

            <button
              className="decrease-button"
              type="button"
              onClick={this.onDecrement}
            >
              Decrement
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CounterApp;
// export default App;
