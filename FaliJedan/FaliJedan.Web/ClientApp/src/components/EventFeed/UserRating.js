import React, { Component } from "react";
import RatingInput from "./RatingInput";
import Loading from "../Loading";

class UserRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRatings: null
    };
  }

  componentDidMount = () => {
    this.setState({
      userRatings: this.props.users.map(user => {
        return { user, rating: 0 };
      })
    });
  };

  handleRatingChange = (index, event) => {
    const rating = event.target.value;

    this.setState(prevState => {
      const newUserRatings = [...prevState.userRatings];

      newUserRatings[index].rating = rating;

      return { userRatings: newUserRatings };
    });
  };

  handleApplyRatings = () => {
    // TODO

    this.props.onAfterRating();
  };

  render() {
    if (this.state.userRatings === null) {
      return <Loading />;
    }
    return (
      <div className="modal__cover">
        <div className="modal__content">
          {this.state.userRatings.map((userRating, index) => (
            <RatingInput
              key={index}
              username={userRating.user.username}
              userRatingIndex={index}
              handleChange={this.handleRatingChange}
            />
          ))}
          <button onClick={this.handleApplyRatings}>Rate</button>
        </div>
      </div>
    );
  }
}

export default UserRating;
