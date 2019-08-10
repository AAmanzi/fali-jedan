import React from "react";

const NumberInput = props => {
  const handleInputChange = event => {
    const { value } = event.target;

    if (/^\d+$/.test(value) || value === "") {
      handleChange(value);
    }
  };

  const handleKeyDown = event => {
    if (event.key === "ArrowUp") {
      handleChange(props.value + 1);
    }
    if (event.key === "ArrowDown") {
      handleChange(props.value - 1);
    }
  };

  const handleChange = value => {
    if (value !== "") {
      value = parseInt(value);
    }

    if (value < 0) {
      return;
    }

    props.handleChange(value);
  };

  return (
    <span className="input__number">
      <span className="navbar__item--create-inner">
        <img
          src="/assets/common/minus.svg"
          alt="-"
          onClick={() => handleChange(props.value - 1)}
        />
      </span>
      <input
        type="text"
        value={props.value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <span className="navbar__item--create-inner plus">
        <img
          src="/assets/common/plus.svg"
          alt="+"
          onClick={() => handleChange(props.value + 1)}
        />
      </span>
    </span>
  );
};

export default NumberInput;
