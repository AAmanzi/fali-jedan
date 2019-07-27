import React, { Component } from "react";
import { getDateNow } from "../../utils/common";

class FilterTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateFrom: "",
      dateTo: ""
    };
  }

  componentDidMount = () => {
    this.setState({
      dateFrom: getDateNow()
    });
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleApply = () => {
    this.props.handleApply(this.state.dateFrom, this.state.dateTo);
  };

  render() {
    return (
      <section className="filter__time">
        <label>
          From:
          <input
            type="date"
            value={this.state.dateFrom}
            name="dateFrom"
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={this.state.dateTo}
            name="dateTo"
            onChange={this.handleInputChange}
          />
        </label>
        <button onClick={this.handleApply}>Apply</button>
      </section>
    );
  }
}

export default FilterTime;
