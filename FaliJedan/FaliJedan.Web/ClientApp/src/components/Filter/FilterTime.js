import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { getFormattedDate } from "../../utils/dateFormatting";

const START_DATE_STRING = "timeframeStartDate";
const END_DATE_STRING = "timeframeEndDate";

class FilterTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyEditing: START_DATE_STRING
    };
  }

  handleDatePickerChange = value => {
    this.props.handleInputChange({
      target: {
        value: getFormattedDate(value),
        name: this.state.currentlyEditing
      }
    });

    this.setState(prevState => {
      return {
        currentlyEditing:
          prevState.currentlyEditing === START_DATE_STRING
            ? END_DATE_STRING
            : START_DATE_STRING
      };
    });
  };

  render() {
    const dateFrom = new Date(this.props.dateFrom);
    const dateTo = new Date(this.props.dateTo);
    return (
      <section className="filter__time">
        <label>
          From:
          <input
            type="date"
            value={this.props.dateFrom}
            name={START_DATE_STRING}
            onChange={this.props.handleInputChange}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={this.props.dateTo}
            name={END_DATE_STRING}
            onChange={this.props.handleInputChange}
          />
        </label>
        <div className="datepicker__container">
          <DatePicker
            selected={dateFrom}
            inline
            startDate={dateFrom}
            endDate={dateTo}
            onChange={this.handleDatePickerChange}
          />
        </div>
      </section>
    );
  }
}

export default FilterTime;
