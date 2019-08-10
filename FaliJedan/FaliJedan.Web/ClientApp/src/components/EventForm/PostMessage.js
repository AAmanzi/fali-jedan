import React from "react";

const PostMessage = props => {
  return (
    <div className="modal__cover">
      <div className="modal__content">
        {props.isPostSuccessful === true ? (
          <span>Your post has been successfully created</span>
        ) : (
          <span>We encountered an error, please try again later</span>
        )}
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
};

export default PostMessage;
