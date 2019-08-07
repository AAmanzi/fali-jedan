import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  newEvent,
  getEventError,
  handleEventFormError
} from "../../utils/event";
import { addEvent } from "../../services/event";
import { getAllSports } from "../../services/sport";

import Loading from "../Loading";
import Navbar from "../Navbar";
import LocationPicker from "../Map/LocationPicker";
import SportIcon from "../SportIcon";
import PostMessage from "./PostMessage";

class NewEventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sportList: null,
      sport: undefined,
      sportId: null,
      currentNumberOfPlayers: "",
      targetNumberOfPlayers: "",
      targetSkillLevel: 0,
      isInstantJoin: true,
      dateOfEvent: "",
      startTime: "",
      endTime: "",
      toggleSportList: true,
      locationLatitude: null,
      locationLongitude: null,

      isPostSuccessful: null,
      redirect: false
    };
  }

  componentDidMount = () => {
    getAllSports().then(sportList => {
      this.setState({ sportList });
    });
  };

  handleSportChange = event => {
    const sportListInput = document.eventForm.toggleSportList;
    sportListInput.checked = false;

    const selectedId = parseInt(event.target.value);

    const sport = this.state.sportList.find(sp => {
      return sp.id === selectedId;
    });
    this.setState({
      sport
    });

    this.handleInputChange(event);
    this.setState({ toggleSportList: false });
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
    this.setState({
      locationLatitude: coordinates[0],
      locationLongitude: coordinates[1]
    });
  };

  handleSubmit = () => {
    const eventToAdd = newEvent(
      this.state.sportId,
      this.state.currentNumberOfPlayers,
      this.state.targetNumberOfPlayers,
      this.state.targetSkillLevel,
      this.state.isInstantJoin,
      this.state.dateOfEvent,
      this.state.startTime,
      this.state.endTime,
      this.state.locationLatitude,
      this.state.locationLongitude
    );

    const eventFormError = getEventError(eventToAdd);

    if (eventFormError !== undefined) {
      handleEventFormError(eventFormError);
      return undefined;
    }

    addEvent(eventToAdd)
      .then(response => {
        this.displaySuccess();
        return response;
      })
      .catch(exception => {
        this.displayError();
        return exception;
      });
  };

  displaySuccess = () => {
    this.setState({ isPostSuccessful: true });
  };

  displayError = () => {
    this.setState({ isPostSuccessful: false });
  };

  redirectToFeed = () => {
    this.setState({ redirect: true });
  };

  render() {
    const {
      sport,
      sportId,
      sportList,
      isPostSuccessful,
      redirect,
      toggleSportList
    } = this.state;

    console.log(this.state);
    if (sportList === null) {
      return <Loading />;
    }
    if (redirect) {
      return <Redirect to="/feed" />;
    }
    return (
      <>
        <div className="event__form__container">
          <form className="event__form" name="eventForm">
            <label
              htmlFor="toggleSportList"
              className="event__form--label-sport"
            >
              {sportId === null ? "Odaberi sport" : sport.name}
            </label>
            <input
              checked={toggleSportList}
              type="checkbox"
              className="event__form--input-sport"
              id="toggleSportList"
              name="toggleSportList"
              onChange={this.handleInputChange}
            />
            <ul className="event__form--list-sport">
              {sportList.map((sport, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name="sportId"
                      id="sportRadio"
                      value={sport.id}
                      onChange={this.handleSportChange}
                    />
                    <SportIcon className="icon--sport" sport={sport.name} />
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
                    name="targetSkillLevel"
                    value="1"
                    onChange={this.handleInputChange}
                  />
                  <span className="icon--rating">★</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="targetSkillLevel"
                    value="2"
                    onChange={this.handleInputChange}
                  />
                  <span className="icon--rating">★</span>
                  <span className="icon--rating">★</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="targetSkillLevel"
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
                name="dateOfEvent"
                type="date"
                value={this.state.dateOfEvent}
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

            <LocationPicker
              coordinates={this.props.currentCoordinates}
              handleClick={this.handleCoordinateChange}
            />
          </form>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <Navbar />

        {isPostSuccessful !== null ? (
          <PostMessage
            isPostSuccessful={isPostSuccessful}
            onClose={this.redirectToFeed}
          />
        ) : (
          undefined
        )}
      </>
    );
  }
}

export default NewEventForm;
