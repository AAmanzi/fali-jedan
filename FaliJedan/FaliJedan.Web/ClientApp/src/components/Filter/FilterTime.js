import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { getFormattedDate, getDate } from "../../utils/dateFormatting";

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
  };

  handleChangeDateToSet = dateToSet => {
    this.setState({
      currentlyEditing: dateToSet
    });
  };

  render() {
    const dateFrom = new Date(this.props.dateFrom);
    const dateTo = new Date(this.props.dateTo);
    return (
      <section className="filter__time">
        <div className="date__display__container">
          <span
            className={`input date__display ${
              this.state.currentlyEditing === START_DATE_STRING
                ? "date-active"
                : ""
            }`}
            onClick={() => this.handleChangeDateToSet(START_DATE_STRING)}
          >
            <img src="/assets/date-icon.svg" alt="Datum" />
            <div className="date__display__content">
              <h3 className="c-bl">OD</h3>
              <h2 className="c-gr">{getDate(this.props.dateFrom)}</h2>
            </div>
          </span>
          <span
            className={`input date__display ${
              this.state.currentlyEditing === END_DATE_STRING
                ? "date-active"
                : ""
            }`}
            onClick={() => this.handleChangeDateToSet(END_DATE_STRING)}
          >
            <img src="/assets/date-icon.svg" alt="Datum" />
            <div className="date__display__content">
              <h3 className="c-bl">DO</h3>
              <h2 className="c-gr">
                {this.props.dateTo !== ""
                  ? getDate(this.props.dateTo)
                  : "Neodređeno"}
              </h2>
            </div>
          </span>
        </div>
        <div className="datepicker__container">
          <DatePicker
            selected={dateFrom}
            inline
            startDate={dateFrom}
            endDate={dateTo}
            onChange={this.handleDatePickerChange}
            minDate={new Date()}
          />
        </div>
      </section>
    );
  }
}

export default FilterTime;
