import React from "react";

const RatingInput = props => {
  return (
    <label className="user__rating--input--container">
      {props.username}
      <div className="user__rating--input">
        <label>
          <input
            type="radio"
            name={props.username}
            value="1"
            onChange={event => props.handleChange(props.userRatingIndex, event)}
          />
          <span className="icon--rating">★</span>
        </label>
        <label>
          <input
            type="radio"
            name={props.username}
            value="2"
            onChange={event => props.handleChange(props.userRatingIndex, event)}
          />
          <span className="icon--rating">★</span>
          <span className="icon--rating">★</span>
        </label>
        <label>
          <input
            type="radio"
            name={props.username}
            value="3"
            onChange={event => props.handleChange(props.userRatingIndex, event)}
          />
          <span className="icon--rating">★</span>
          <span className="icon--rating">★</span>
          <span className="icon--rating">★</span>
        </label>
        <label>
          <input
            type="radio"
            name={props.username}
            value="4"
            onChange={event => props.handleChange(props.userRatingIndex, event)}
          />
          <span className="icon--rating">★</span>
          <span className="icon--rating">★</span>
          <span className="icon--rating">★</span>
          <span className="icon--rating">★</span>
        </label>
        <label>
          <input
            type="radio"
            name={props.username}
            value="5"
            onChange={event => props.handleChange(props.userRatingIndex, event)}
          />
          <span className="icon--rating">★</span>
          <span className="icon--rating">★</span>
          <span className="icon--rating">★</span>
          <span className="icon--rating">★</span>
          <span className="icon--rating">★</span>
        </label>
      </div>
    </label>
  );
};

export default RatingInput;
