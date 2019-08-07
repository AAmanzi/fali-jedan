import React, { Component } from "react";
import EventCard from "./EventCard";
import Navbar from "./Navbar";
import Loading from "./Loading";
import FilterBar from "./Filter/FilterBar";

class EventFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventList: null,
      selectedSports: [],
      timeframeStartDate: null,
      timeframeEndDate: null,
      isFilterBarDisplayed: false
    };
  }

  componentDidMount = () => {
    this.setState({
      eventList: [
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        },
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        },
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        },
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        },
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        },
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        }
      ]
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

  displayFilterBar = () => {
    this.setState({
      isFilterBarDisplayed: true
    });
  };

  closeFilterBar = () => {
    this.setState({
      isFilterBarDisplayed: false
    });
  };
  applyFilters = () => {
    // TODO: get filtered events
    console.log("filter events");

    this.closeFilterBar();
  };

  render() {
    if (this.state.eventList === null) {
      return <Loading />;
    }

    return (
      <>
        {this.state.isFilterBarDisplayed === true ? (
          <FilterBar
            coordinates={this.props.currentCoordinates}
            selectedSports={this.state.selectedSports}
            handleSetLocation={this.props.handleLocationFilterChange}
            handleResetLocation={this.props.handleLocationFilterReset}
            handleSetTimeframe={this.setTimeframe}
            handleAddSport={this.addSport}
            applyFilters={this.applyFilters}
          />
        ) : (
          undefined
        )}

        <header>
          <span>Event lista</span>
          <button onClick={this.displayFilterBar}>Filter</button>
        </header>

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
