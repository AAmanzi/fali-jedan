import React, { Component } from "react";
import { newEvent, isEventValid } from "../../utils/event";

import Loading from "../Loading";
import Navbar from "../Navbar";
import LocationPicker from "../Map/LocationPicker";

class NewEventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sportList: null,
      sport: "",
      currentNumberOfPlayers: "",
      targetNumberOfPlayers: "",
      skillLevel: 0,
      isInstantJoin: false,
      date: "",
      startTime: "",
      endTime: "",
      coordinates: null
    };
  }

  componentDidMount = () => {
    this.setState({ sportList: ["default", "default", "default", "default"] });
  };

  handleSportChange = event => {
    const sportListInput = document.eventForm.toggleSportList;
    sportListInput.checked = false;

    this.handleInputChange(event);
  };

  handleInputChange = event => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleCoordinateChange = coordinates => {
    console.log(coordinates);

    this.setState({
      coordinates
    });
  };

  handleSubmit = () => {
    const {
      sport,
      currentNumberOfPlayers,
      targetNumberOfPlayers,
      skillLevel,
      isInstantJoin,
      date,
      startTime,
      endTime,
      coordinates
    } = this.state;
    const eventToAdd = newEvent(
      sport,
      currentNumberOfPlayers,
      targetNumberOfPlayers,
      skillLevel,
      isInstantJoin,
      date,
      startTime,
      endTime,
      coordinates
    );

    if (!isEventValid(eventToAdd)) {
      return undefined;
    }

    alert(JSON.stringify(eventToAdd))

    // TODO Update Database
  };

  render() {
    if (this.state.sportList === null) {
      return <Loading />;
    }
    return (
      <>
        <div className="event__form__container">
          <form
            className="event__form"
            name="eventForm"
            onSubmit={this.handleSubmit}
          >
            <label
              htmlFor="toggleSportList"
              className="event__form--label-sport"
            >
              {this.state.sport === "" ? "Sport" : this.state.sport}
            </label>
            <input
              type="checkbox"
              className="event__form--input-sport"
              id="toggleSportList"
            />
            <ul className="event__form--list-sport">
              {this.state.sportList.map((sport, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name="sport"
                      id="sportRadio"
                      value={sport}
                      onChange={this.handleSportChange}
                    />
                    <img
                      className="icon--sport"
                      src={`/assets/sports/${sport}.jpg`}
                      alt={sport}
                      htmlFor="sportRadio"
                    />
                  </label>
                </li>
              ))}
            </ul>
            <label>Current number of players / target number of players</label>
            <label>
              <input
                name="currentNumberOfPlayers"
                type="number"
                value={this.state.currentNumberOfPlayers}
                onChange={this.handleInputChange}
              />
              /
              <input
                name="targetNumberOfPlayers"
                type="number"
                value={this.state.targetNumberOfPlayers}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="event__form--rating--container">
              Skill level:
              <div className="event__form--rating">
                <label>
                  <input
                    type="radio"
                    name="skillLevel"
                    value="1"
                    onChange={this.handleInputChange}
                  />
                  <span className="icon--rating">★</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="skillLevel"
                    value="2"
                    onChange={this.handleInputChange}
                  />
                  <span className="icon--rating">★</span>
                  <span className="icon--rating">★</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="skillLevel"
                    value="3"
                    onChange={this.handleInputChange}
                  />
                  <span className="icon--rating">★</span>
                  <span className="icon--rating">★</span>
                  <span className="icon--rating">★</span>
                </label>
              </div>
            </label>
            <label>Instant join</label>
            <label className="event__form--switch">
              <input
                type="checkbox"
                name="isInstantJoin"
                onChange={this.handleInputChange}
                defaultChecked={true}
              />
              <span className="event__form--switch--slider" />
            </label>
            <label>
              Date:
              <input
                name="date"
                type="date"
                value={this.state.date}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Start:
              <input
                name="startTime"
                type="time"
                value={this.state.startTime}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              End:
              <input
                name="endTime"
                type="time"
                value={this.state.endTime}
                onChange={this.handleInputChange}
              />
            </label>

            <LocationPicker handleClick={this.handleCoordinateChange} />

            <input type="submit" value="Submit" />
          </form>
        </div>
        <Navbar />
      </>
    );
  }
}

export default NewEventForm;
