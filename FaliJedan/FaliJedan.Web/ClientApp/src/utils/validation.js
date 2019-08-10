export const validateLength = (string, length) => {
  return string.length > length;
};

export const validateEmail = email => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

export const compareStrings = (first, second) => {
  return first === second;
};

export const validateUser = user => {
  if (user.firstName === "") {
    alert("First name cannot be blank");
    return false;
  }

  if (user.lastName === "") {
    alert("Last name cannot be blank");
    return false;
  }

  if (!validateLength(user.username, 3)) {
    alert("Username must contain at least 4 characters");
    return false;
  }

  if (!validateEmail(user.email)) {
    alert("Invalid email address!");
    return false;
  }

  if (!validateLength(user.password, 5)) {
    alert("Password must contain at least 6 characters");
    return false;
  }

  if (!compareStrings(user.password, user.repeatPassword)) {
    alert("Passwords do not match!");
    return false;
  }

  return true;
};
