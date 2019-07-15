import React, { Component } from "react";
import EventCard from "EventCard";

class EventFeed extends Component {
  constructor(props){
    super(props);

    this.state = {
      eventList = []
    }
  }

  render(){
    return(
      <ul className="list__events">
        {eventList.map((event, index) => <EventCard key={index} event={event}/>)}
      </ul>
    );
  }
}

export const EventFeed;