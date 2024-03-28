export const usernameValidator = (username) => {
  if (!username) {
    return "Username is required";
  } else if (username.length < 6) {
    return "Incorrect username format";
  }
  return "";
};

export const emailValidator = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format";
  }
  return "";
};

export const phoneValidator = (phone) => {
  if (!phone) {
    return "Phone is required";
  } else if (phone.length < 10) {
    return "Phone must have a minimum 10 Number";
  }
  return "";
};
