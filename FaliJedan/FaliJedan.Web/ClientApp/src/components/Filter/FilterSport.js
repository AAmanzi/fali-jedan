import React, { Component } from "react";
import Loading from "../Loading";
import SportIcon from "../SportIcon";

class FilterSport extends Component {
  constructor() {
    super();

    this.state = {
      allSports: null
    };
  }

  componentDidMount = () => {
    this.setState({
      allSports: ["default", "default", "default", "default", "default"]
    });
  };

  render() {
    const { allSports } = this.state;

    if (allSports === null) {
      return (
        <section className="filter__sport">
          <Loading />
        </section>
      );
    }
    return (
      <section className="filter__sport">
        <ul className="filter__sport__list">
          {allSports.map((sport, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  name="sport"
                  checked={this.props.selectedSports.includes(sport)}
                  onChange={() => this.props.handleApply(sport)}
                />
                <SportIcon
                  className="icon--sport icon--sport-checkbox"
                  sport={sport}
                />
              </label>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default FilterSport;
