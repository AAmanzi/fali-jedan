import React, { Component } from "react";
import EventCard from "./EventCard";
import Navbar from "./Navbar";
import Loading from "./Loading";
import FilterBar from "./Filter/FilterBar";
import { getAvailableEvents, getFilteredEvents } from "../services/event";
import { getAllSports } from "../services/sport";
import { eventDto } from "../utils/event";
import { getDateNow } from "../utils/dateFormatting";

class EventFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventList: null,
      allSports: null,
      selectedSports: [],
      timeframeStartDate: "",
      timeframeEndDate: ""
    };
  }

  componentDidMount = () => {
    getAvailableEvents().then(availableEvents => {
      const eventList = availableEvents.map(element => eventDto(element));
      this.setState({ eventList });
    });

    getAllSports().then(allSports => {
      this.setState({ allSports });
    });

    this.setState({
      timeframeStartDate: getDateNow()
    });
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  addSport = sport => {
    this.setState(prevState => {
      let newSports = [...prevState.selectedSports];
      const sportFound = newSports.find(el => el === sport);

      if (sportFound === undefined) {
        newSports.push(sport);
      } else {
        newSports = newSports.filter(sport => sport !== sportFound);
      }

      return {
        selectedSports: newSports
      };
    });
  };

  applyFilters = () => {
    getFilteredEvents({
      sports: this.state.selectedSports,
      timeframeStartDate: this.state.timeframeStartDate,
      timeframeEndDate: this.state.timeframeEndDate,
      currentLatitude: this.props.currentCoordinates[0],
      currentLongitude: this.props.currentCoordinates[1]
    }).then(filteredEvents => {
      console.log(filteredEvents);
      const eventList = filteredEvents.map(element => eventDto(element));
      this.setState({ eventList });
    });
  };

  render() {
    if (this.state.eventList === null || this.state.allSports === null) {
      return <Loading />;
    }

    return (
      <>
        <FilterBar
          allSports={this.state.allSports}
          coordinates={this.props.currentCoordinates}
          selectedSports={this.state.selectedSports}
          timeframeStartDate={this.state.timeframeStartDate}
          timeframeEndDate={this.state.timeframeEndDate}
          handleSetLocation={this.props.handleLocationFilterChange}
          handleResetLocation={this.props.handleLocationFilterReset}
          handleTimeChange={this.handleInputChange}
          handleAddSport={this.addSport}
          applyFilters={this.applyFilters}
        />

        <ul className="event__list">
          {this.state.eventList.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </ul>

        <Navbar />
      </>
    );
  }
}

export default EventFeed;
