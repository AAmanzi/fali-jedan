import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  newEvent,
  getEventError,
  handleEventFormError
} from "../../utils/event";
import { addEvent } from "../../services/event";
import { getAllSports } from "../../services/sport";
import { getDate, getTime } from "../../utils/dateFormatting";

import DatePicker from "react-datepicker";
import Loading from "../Loading";
import Navbar from "../Navbar";
import LocationPicker from "../Map/LocationPicker";
import SportIcon from "../SportIcon";
import PostMessage from "./PostMessage";
import NumberInput from "./NumberInput";
import { getHours } from "date-fns";

class NewEventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sportList: null,
      sport: undefined,
      sportId: null,
      eventName: "",
      currentNumberOfPlayers: 0,
      targetNumberOfPlayers: 0,
      targetSkillLevel: 0,
      isInstantJoin: true,
      dateOfEvent: "",
      startTime: "",
      endTime: "",
      toggleSportList: true,
      locationLatitude: null,
      locationLongitude: null,
      description: "",

      isPostSuccessful: null,
      redirect: false
    };
  }

  componentDidMount = () => {
    getAllSports().then(sportList => {
      this.setState({ sportList, dateOfEvent: new Date() });
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

  handleCurrentNumberChange = value => {
    this.setState({
      currentNumberOfPlayers: value
    });
  };

  handleTargetNumberChange = value => {
    this.setState({
      targetNumberOfPlayers: value
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
      this.state.eventName,
      this.state.currentNumberOfPlayers,
      this.state.targetNumberOfPlayers,
      this.state.targetSkillLevel,
      this.state.isInstantJoin,
      this.state.dateOfEvent,
      this.state.startTime,
      this.state.endTime,
      this.state.locationLatitude,
      this.state.locationLongitude,
      this.state.description
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
            <header>
              <img
                src="/assets/back-icon.svg"
                alt="Nazad"
                onClick={this.redirectToFeed}
              />
              <label htmlFor="toggleSportList" className="header__title">
                {sportId === null ? "Odaberi sport" : sport.name}
              </label>
              <span className="spacing" />
            </header>
            <input
              checked={toggleSportList}
              type="checkbox"
              className="event__form--input-sport"
              id="toggleSportList"
              name="toggleSportList"
              onChange={this.handleInputChange}
            />
            <section className="event__form--list-sport filter__sport">
              <ul className="filter__sport__list">
                {sportList.map((sport, index) => (
                  <React.Fragment key={index}>
                    <input
                      type="radio"
                      name="sportId"
                      id={`sport_${index}`}
                      value={sport.id}
                    />
                    <li
                      key={index}
                      onClick={() =>
                        this.handleSportChange({
                          target: {
                            value: sport.id,
                            name: "sportId"
                          }
                        })
                      }
                    >
                      <img src="assets/checkmark-icon.svg" alt="Označen" />
                      <label htmlFor={`sport_${index}`}>
                        <SportIcon
                          className="icon--sport icon--sport-checkbox"
                          sport={sport.name}
                        />
                      </label>
                      <span className="c-az tt-uc fw-b">{sport.name}</span>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </section>
            <span className="arrow-down" />
            <section className="event__form__content">
              <label className="input">
                <SportIcon
                  className="icon--sport alt event__form--icon"
                  sport={
                    this.state.sport !== undefined
                      ? this.state.sport.name
                      : "Nogomet"
                  }
                />
                <div className="input__content">
                  <h3 className="c-bl tt-uc fs-11">Naziv eventa</h3>
                  <input
                    name="eventName"
                    type="text"
                    placeholder="npr. Tranvato igralište - OŠ Brda"
                    value={this.state.eventName}
                    onChange={this.handleInputChange}
                  />
                </div>
              </label>

              <label className="input__number__container">
                <h2 className="c-bl fw-b fs-17">Broj trenutnih igrača</h2>
                <NumberInput
                  value={this.state.currentNumberOfPlayers}
                  handleChange={this.handleCurrentNumberChange}
                />
              </label>
              <label className="input__number__container">
                <h2 className="c-bl fw-b fs-17">Broj traženih igrača</h2>
                <NumberInput
                  value={this.state.targetNumberOfPlayers}
                  handleChange={this.handleTargetNumberChange}
                />
              </label>
              <span className="input input__date">
                <div className="input__container__date">
                  <img
                    className="event__form--icon"
                    src="/assets/date-icon.svg"
                  />
                  <div className="input__content">
                    <h3 className="c-bl tt-uc fs-11">Datum eventa</h3>
                    <span>{getDate(this.state.dateOfEvent)}</span>
                  </div>
                </div>
                <DatePicker
                  inline={true}
                  selected={this.state.dateOfEvent}
                  minDate={new Date()}
                  onChange={value =>
                    this.handleInputChange({
                      target: {
                        name: "dateOfEvent",
                        value
                      }
                    })
                  }
                />
              </span>

              <div className="input__container">
                <label className="input date__display">
                  <img src="/assets/time-icon.svg" alt="Vrijeme" />
                  <div className="input__content">
                    <h3 className="c-bl tt-uc fs-11">Početak eventa</h3>
                    <DatePicker
                      onChange={value =>
                        this.handleInputChange({
                          target: {
                            name: "startTime",
                            value: getTime(value)
                          }
                        })
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                      placeholderText={this.state.startTime}
                    />
                  </div>
                </label>
                <img src="/assets/arrow-right-icon.svg" alt="do" />
                <label className="input date__display">
                  <img src="/assets/time-icon.svg" alt="Vrijeme" />
                  <div className="input__content">
                    <h3 className="c-bl tt-uc fs-11">Kraj eventa</h3>
                    <DatePicker
                      onChange={value =>
                        this.handleInputChange({
                          target: {
                            name: "endTime",
                            value: getTime(value)
                          }
                        })
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                      placeholderText={this.state.endTime}
                    />
                  </div>
                </label>
              </div>

              <LocationPicker
                coordinates={this.props.currentCoordinates}
                handleClick={this.handleCoordinateChange}
              />

              <label className="input">
                <div className="input__content">
                  <h3 className="c-bl tt-uc fs-11">Opis eventa</h3>
                  <input
                    name="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    placeholder="Unesite dodatne informacije o eventu"
                  />
                </div>
              </label>

              <label className="event__form--switch">
                <h2 className="c-bl fw-b fs-17">Izravno pridruživanje</h2>
                <input
                  type="checkbox"
                  name="isInstantJoin"
                  onChange={this.handleInputChange}
                  defaultChecked={true}
                />
                <span className="event__form--switch--slider" />
              </label>

              <span className="event__form--rating--container">
                <h2 className="c-bl fw-b fs-17">Razina igre</h2>
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
                  <label>
                    <input
                      type="radio"
                      name="targetSkillLevel"
                      value="4"
                      onChange={this.handleInputChange}
                    />
                    <span className="icon--rating">★</span>
                    <span className="icon--rating">★</span>
                    <span className="icon--rating">★</span>
                    <span className="icon--rating">★</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="targetSkillLevel"
                      value="5"
                      onChange={this.handleInputChange}
                    />
                    <span className="icon--rating">★</span>
                    <span className="icon--rating">★</span>
                    <span className="icon--rating">★</span>
                    <span className="icon--rating">★</span>
                    <span className="icon--rating">★</span>
                  </label>
                </div>
              </span>
              <button
                className="button-big tt-uc"
                onClick={this.handleSubmit}
                type="button"
              >
                Kreiraj event
              </button>
            </section>
          </form>
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
