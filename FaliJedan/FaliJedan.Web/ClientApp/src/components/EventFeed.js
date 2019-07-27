import React, { Component } from "react";
import EventCard from "./EventCard";
import Navbar from "./Navbar";
import Loading from "./Loading";
import FilterBar from "./Filter/FilterBar";
import { getAvailableEvents } from "../services/event";
import { eventDto } from "../utils/event";

class EventFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventList: null,
      selectedSports: [],
      timeframeStartDate: null,
      timeframeEndDate: null
    };
  }

  componentDidMount = () => {
    getAvailableEvents().then(availableEvents => {
      const eventList = availableEvents.map(event => eventDto(event));
      this.setState({ eventList });
    });
  };

  setTimeframe = (timeframeStartDate, timeframeEndDate) => {
    this.setState({
      timeframeStartDate,
      timeframeEndDate
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
    // TODO: get filtered events
    console.log("filter events");
  };

  render() {
    if (this.state.eventList === null) {
      return <Loading />;
    }

    return (
      <>
        <FilterBar
          coordinates={this.props.currentCoordinates}
          selectedSports={this.state.selectedSports}
          handleSetLocation={this.props.handleLocationFilterChange}
          handleResetLocation={this.props.handleLocationFilterReset}
          handleSetTimeframe={this.setTimeframe}
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
